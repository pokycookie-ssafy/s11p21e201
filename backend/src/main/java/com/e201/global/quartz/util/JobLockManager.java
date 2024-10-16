package com.e201.global.quartz.util;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

public class JobLockManager {
	public static final ReentrantLock lock = new ReentrantLock();

	public static void lock() {
		try {
			lock.tryLock(10, TimeUnit.HOURS);
		} catch (InterruptedException e) {
			throw new RuntimeException(e);
		}
	}

	public static void unlock() {
		lock.unlock();
	}
}

