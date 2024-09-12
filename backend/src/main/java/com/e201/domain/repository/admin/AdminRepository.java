package com.e201.domain.repository.admin;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e201.domain.entity.admin.Admin;

public interface AdminRepository extends JpaRepository<Admin, UUID> {
}
