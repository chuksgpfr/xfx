# xfx


# Clone this repo and run the following command in root directory
- `yarn install:dev` to install all dependencies and initialize prisma
- `yarn migrate` migrate DB (before doing this, change DB settings in app/prisma/schema.prisma file, would have been env file but ...)


# Test endpoints with these urls 
- Base url https://xchangerfx.herokuapp.com/
- ## List movies
    - /movies GET
    - /movies/{name} GET name is the name of the movie
- ## Comments
    - /comment POST post comment
        - ```js
                {
                    name:"",//not required, defaults to anonymous
                    comment:"", //
                    movieId: 1 //the episode_id of the movie
                }
          ```
    - /comment GET get all comment
- ## characters
    - both URL take  takes `?parameter=skywalker` OR AND `?gender=male` as query parameters
    - /character GET list all characcter
    - /character/{film} GET list all character in a movie



