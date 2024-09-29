package com.e201.domain.repository.store;

import java.util.List;
<<<<<<< HEAD
<<<<<<< HEAD
import java.util.Optional;
=======
>>>>>>> ad44aae ([#31] feat: 식당 메뉴 리스트 조회 기능 구현)
=======
import java.util.Optional;
>>>>>>> ebc4640 ([#31] 메뉴 조회 조건에 수정된 사항, 삭제 사항 반영)
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e201.domain.entity.store.Menu;

public interface MenuRepository extends JpaRepository<Menu, UUID> {
<<<<<<< HEAD
<<<<<<< HEAD
	List<Menu> findByStoreIdAndModifiedYNAndDeleteYN(UUID storeId, String modifiedYN, String deleteYN);
	Optional<Menu> findByIdAndModifiedYNAndDeleteYN(UUID id, String modifiedYN, String deleteYN);

=======
	List<Menu> findByStoreId(UUID storeId);
>>>>>>> ad44aae ([#31] feat: 식당 메뉴 리스트 조회 기능 구현)
=======
	List<Menu> findByStoreIdAndModifiedYNIsNullAndDeleteYNIsNull(UUID storeId);
	Optional<Menu> findByIdAndModifiedYNIsNullAndDeleteYNIsNull(UUID id);

>>>>>>> ebc4640 ([#31] 메뉴 조회 조건에 수정된 사항, 삭제 사항 반영)
}
