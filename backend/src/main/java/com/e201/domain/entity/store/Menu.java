package com.e201.domain.entity.store;

import java.util.UUID;

import com.e201.domain.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Menu extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name="menu_id" , columnDefinition = "BINARY(16)")
	private UUID id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="store_id")
	private Store store;

	@Column(name="price")
	private int price;

	@Column(name="name")
	private String name;

	@Column(name = "status")
	private MenuStatus status;

	@Builder
	public Menu(UUID id, Store store, String name, int price, MenuStatus status){
		this.id =id;
		this.store = store;
		this.name = name;
		this.price = price;
		this.status =status;
	}

	public void changeFlag(MenuStatus status){
		this.status = status;
	}
}
