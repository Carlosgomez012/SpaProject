package com.example.Gcashf1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name= "expense")//Nombre de la tabla

public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private Instant expensedate;//variable que mide el paso del tiempo
    // una variable de tipo fecha
    //un temporizador , un punto en la linea de tiempo
    private String location;
    private double monto;


     // Traveling to Miami







    // You have Id(expense), Date,Description,            User Id,category ID.
                       //350, 6/11/2023, Viajando a miami,    1   , 3(viajes)

    @ManyToOne
    private Category category; //Muchos de estos gastos
    //pueden ir a una categoria

    @JsonIgnore
    @ManyToOne
    private User user;


}
