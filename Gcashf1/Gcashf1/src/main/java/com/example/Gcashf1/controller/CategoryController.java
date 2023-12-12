package com.example.Gcashf1.controller;

import com.example.Gcashf1.model.Category;
import com.example.Gcashf1.repository.CategoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.net.URI;





@RestController
@RequestMapping("/api")

public class CategoryController {
    private CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

@GetMapping("/categories")
public List <Category> categories(){
return categoryRepository.findAll();
//select *from category

}

//category 2 / find a category by ID.

    //category/2
    @GetMapping("/category/{id}")
    ResponseEntity<?> getCategory(@PathVariable Long id){
        Optional<Category> category = categoryRepository.findById(id);
        return category.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));}


        // devuelve una respuesta http es decir,
    //http tiene 3 atributos cabeceras,cuerpo,error o asierto
    //entonces la cabebcera es el titulo como el de una carta,el cuerpo lo que envia
    //como los datos(el cuerpo)
    //codigo si funciono o no, es decir si se envio el mensaje o no(status code)

        @PostMapping("/category")
        ResponseEntity<Category> createCategory(@Validated @RequestBody Category category) throws URISyntaxException {
            Category result= categoryRepository.save(category);
            return ResponseEntity.created(new URI("/api/category" + result.getId())).body(result);

        }



        @PutMapping("/category/{id}")
        ResponseEntity<Category> updateCategory(@Validated @RequestBody Category category){
            Category result= categoryRepository.save(category);
            return ResponseEntity.ok().body(result);
        }



        @DeleteMapping("/category/{id}")
        ResponseEntity<?> deleteCategory(@PathVariable Long id){
            categoryRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }




}
