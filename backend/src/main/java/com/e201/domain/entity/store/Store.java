package com.e201.domain.entity.store;

import java.util.UUID;

import com.e201.domain.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Store extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name= "store_id" ,columnDefinition = "BINARY(16)")
	private UUID id;

	@OneToOne
	@JoinColumn(name="store_info_id", columnDefinition ="BINARY(16)")
	private StoreInfo storeInfo;

	@Column(name="email")
	private String email;

	@Column(name="password")
	private String password;

	@Builder
	public Store(UUID id, StoreInfo storeInfo, String email, String password ) {
		this.id = id;
		this.storeInfo = storeInfo;
		this.email = email;
		this.password = password;

	}
}
