package com.example.Gcashf1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name= "category")//Nombre de la tabla

public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)


    private Long id;// Id de la categoria
    @NonNull
    @Column(unique = true)
    private String name;// Viajar, deuda estudiantil ..

    private String emoji;

    //@ManyToOne(cascade=CascadeType.PERSIST)
    //private User user

    //Many categories can be conected to one user

    //Yo need to persist both tables, because without  user
    // it doesnt exist categories
}
