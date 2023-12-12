package com.example.Gcashf1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name= "User")//Nombre de la tabla

public class User {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;


    private String name;


    @Column(name = "email",unique = true,nullable = false)
    private String email;


    //One user to many categories ,one user is gonna have a
    //a lo tof categories

    // so we connect user with categories



}
