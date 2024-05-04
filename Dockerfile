# ----- İlk Aşama: React Uygulamasını Oluşturun -----

# Node.js tabanlı resmi imajı kullan
FROM node:14 AS react-build

# Çalışma dizinini /app olarak ayarla
WORKDIR /app

# Gerekli paket.json dosyalarını ve lock dosyalarını kopyala
COPY todolist/package*.json ./

# Paketleri yükle
RUN npm install

# Uygulamayı kopyala
COPY todolist .

# Uygulamayı oluştur
RUN npm run build


# ----- İkinci Aşama: Express Sunucusunu İnşa Edin -----

# Node.js tabanlı resmi imajı kullan
FROM node:14

# Çalışma dizinini /app olarak ayarla
WORKDIR /app

# Gerekli paket.json dosyalarını ve lock dosyalarını kopyala
COPY todolist-api/package*.json ./

# Paketleri yükle
RUN npm install

# Uygulamayı kopyala
COPY todolist-api .

# React uygulamasının oluşturulan dosyalarını kopyala
COPY --from=react-build /app/build ./client/build

# Port numarasını belirle
EXPOSE 3000

# Uygulamayı başlat
CMD ["node", "node-swagger/api/server.js"]
