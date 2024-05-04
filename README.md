# ToDoList

# TodoList Uygulaması

Bu proje, React.js ve Express.js kullanılarak oluşturulmuş basit bir TodoList uygulamasıdır. Kullanıcılar, yapılacak işleri ekleyebilir, düzenleyebilir, işaretleyebilir ve silebilirler.

## Başlarken

Bu uygulamayı çalıştırmak için aşağıdaki adımları izleyin:

1. Repoyu klonlayın:

    git clone https://github.com/sizin-kullanıcı-adınız/todo-list.git

2. İstemci ve sunucu klasörlerinde bağımlılıkları yükleyin:

    cd todolist
    npm install

    cd todolist-api
    npm install


3. Sunucuyu ve istemciyi başlatın:

    cd todolist
    npm start

    cd todolist-api/node-swagger/api
    node server.js

4. Tarayıcınızda `http://localhost:3000` adresine gidin ve TodoList uygulamasını görmelisiniz.

## API Dökümantasyonu

Sunucu, aşağıdaki API rotalarını sağlar:

- GET /todos: Tüm yapılacak işleri getirir.
- POST /todos: Yeni bir yapılacak iş ekler.
- PUT /todos/:id: Belirli bir yapılacak işi günceller.
- DELETE /todos/:id: Belirli bir yapılacak işi siler.

## Docker ile Çalıştırma

Bu projeyi Docker kullanarak da çalıştırabilirsiniz. Docker konteynerini başlatmak için:

1. DockerHub'dan imajı çekin:

    docker pull sudenurglcn/todolist

2. Konteyneri başlatın:

    docker run -p 3000:3000 kullanıcı_adı/todo-list

3. Tarayıcınızda `http://localhost:3000` adresine gidin ve TodoList uygulamasını görmelisiniz.

## DockerHub

    Docker imajını [DockerHub](https://hub.docker.com/repository/docker/sudenurglcn/todolist/general) adresinden bulabilirsiniz.

---
