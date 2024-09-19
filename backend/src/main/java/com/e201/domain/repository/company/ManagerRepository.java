package com.e201.domain.repository.company;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e201.api.service.company.ManagerService;
import com.e201.domain.entity.company.Manager;

public interface ManagerRepository extends JpaRepository<Manager, UUID> {
}
