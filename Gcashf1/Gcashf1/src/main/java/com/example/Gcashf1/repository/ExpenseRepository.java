package com.example.Gcashf1.repository;

import com.example.Gcashf1.model.Category;
import com.example.Gcashf1.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

 public interface ExpenseRepository extends JpaRepository<Expense,Long>  {
}
