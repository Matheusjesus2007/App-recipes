# Receitas App
Este projeto é uma aplicação web desenvolvida para resolução 360 x 640, que permite pesquisar novas receitas. Com uma tela de login, tela de comidas e bebidas com sugestões de receitas ou sugestões de categorias, filtro de receitas, por nome, ingrediente ou primeira letra, além de detalhes completos de cada receita, os usuários podem facilmente encontrar o que estão procurando. Além disso, os usuários podem marcar as etapas concluídas de cada receita, favoritá-las ou compartilhá-las.

## Tecnologias Utilizadas
- React
- React Router dom
- Dynamic Routing
- LocalStorage
- Context API
- Hooks
- CSS Modules

### Api's utilizadas para comidas  
`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catMeal}`  
`https://www.themealdb.com/api/json/v1/1/list.php?c=list`  
`https://www.themealdb.com/api/json/v1/1/search.php?s=`  
`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`  
`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`    
`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`  
`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`  
Documentação: https://www.themealdb.com/api.php

### Api's utilizadas para bebidas  
`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${catDrink}`  
`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`  
`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`  
`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`  
`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`  
`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`  
`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`  
Documentação: https://www.thecocktaildb.com/api.php

Como Instalar:
Clone este repositório:  
`git clone git@github.com:Matheusjesus2007/App-recipes.git`

Navegue até a pasta do projeto:  
`cd receitas-app`

Instale as dependências:  
`npm install`

Para executar a aplicação, basta rodar o comando:  
`npm start`

Isso irá iniciar a aplicação no seu navegador padrão. Na tela inicial, você será solicitado a fazer login. Após o login, você será levado à página de receitas, onde poderá navegar pelas diferentes categorias e filtrar receitas por nome, ingrediente ou primeira letra. Cada receita possui uma página de detalhes onde você pode ver informações adicionais. Podera iniciar a receita, marcar as etapas concluídas, favoritar ou compartilhar a receita. Você também pode acessar as páginas de receitas favoritas, receitas feitas ou a tela de perfil, que também tem recomendações!

### Contato
Se você tiver alguma dúvida ou precisar de ajuda com o projeto, entre em contato:  
Email: matheusjesus885@outlook.com  
LinkedIn: https://www.linkedin.com/in/matheus-alexandrino-dev/  

### Créditos
Este projeto foi originalmente desenvolvido por Bernardo Marques, Bruna Leal, Bruna Rodrigues, Matheus de Jesus, Stariel Isaac. Agradeço pela contribuição inicial deles. A refatoração e estilização foram realizadas por Matheus de Jesus Alexandrino.
