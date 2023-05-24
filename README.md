# software-develop
This is the project for TSMC

## cloud_frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup (natively)

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Project Dockerized Setup (for Production)
```sh
docker build -t docker-vue .
```
### To check if built up properly
```
docker image ls
```
The output should be something similar as below:
``` 
REPOSITORY    TAG       IMAGE ID       CREATED          SIZE
docker-vue    latest    dd8981d68791   x seconds ago   yMB
```
To run the container:
```
docker run -p 8080:8080 -d docker-vue
```
