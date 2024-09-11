package com.e201.global.db.datasource;

import java.util.List;

import lombok.ToString;

@ToString
public class CircularList<T> {
	private final List<T> list;
	private Integer counter = 0;

	public CircularList(List<T> list) {
		this.list = list;
	}

	public T getOne() {
		// TODO <jhl221123> slave scale-out
		// if (counter + 1 >= list.size()) {
		// 	counter = -1;
		// }
		// return list.get(++counter);
		return list.get(counter);
	}
}
