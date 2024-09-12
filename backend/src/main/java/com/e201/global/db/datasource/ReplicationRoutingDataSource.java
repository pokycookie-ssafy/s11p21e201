package com.e201.global.db.datasource;

import java.util.Map;
import java.util.stream.Collectors;

import javax.sql.DataSource;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.util.CollectionUtils;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ReplicationRoutingDataSource extends AbstractRoutingDataSource {

	private CircularList<String> dataSourceNameList;

	@Override
	public void setTargetDataSources(Map<Object, Object> targetDataSources) {
		super.setTargetDataSources(targetDataSources);

		// slave db 정보를 CircularList로 관리
		dataSourceNameList = new CircularList<>(
			targetDataSources.keySet()
				.stream()
				.map(Object::toString)
				.filter(string -> string.contains("slave"))
				.collect(Collectors.toList())
		);
	}

	@Override
	protected Object determineCurrentLookupKey() {
		boolean isReadOnly = TransactionSynchronizationManager.isCurrentTransactionReadOnly();
		if (isReadOnly) {
			logger.info("Connection Slave");
			return dataSourceNameList.getOne();
		} else {
			logger.info("Connection Master");
			return "master";
		}
	}
}
