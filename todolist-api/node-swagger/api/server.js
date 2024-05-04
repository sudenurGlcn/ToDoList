

const express = require('express');
const fs = require('fs');
const cors = require('cors'); // cors modülünü ekledik

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// CORS middleware'ini kullanarak tüm isteklere CORS başlıklarını ekle
app.use(cors());

// GET isteği için endpoint
app.get('/toDoList', (req, res) => {
    // Dosyadaki verileri oku
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Veriler okunurken bir hata oluştu:', err);
            res.status(500).send('Veriler okunurken bir hata oluştu');
        } else {
            console.log('Veriler başarıyla okundu');
            res.status(200).send(data);
        }
    });
});
app.post('/toDoList', (req, res) => {
        const newTodo = req.body; // POST isteğinden gelen yeni todo verisi
    
        // Dosyaya yeni todo verisini ekleyin
        fs.readFile('data.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('Veriler okunurken bir hata oluştu:', err);
                res.status(500).send('Veriler okunurken bir hata oluştu');
            } else {
                let todos = [];
                try {
                    todos = JSON.parse(data); // Dosyadaki mevcut verileri bir dizi olarak al
                } catch (error) {
                    console.error('Verileri ayrıştırırken bir hata oluştu:', error);
                    res.status(500).send('Verileri ayrıştırırken bir hata oluştu');
                    return;
                }
    
                // Yeni todo verisini diziye ekle
                todos.push(newTodo);
    
                // Diziyi JSON formatına dönüştürerek dosyaya yaz
                fs.writeFile('data.txt', JSON.stringify(todos), (err) => {
                    if (err) {
                        console.error('Veriler dosyaya yazılırken bir hata oluştu:', err);
                        res.status(500).send('Veriler dosyaya yazılırken bir hata oluştu');
                    } else {
                        console.log('Yeni todo başarıyla eklendi');
                        res.status(201).send('Yeni todo başarıyla eklendi');
                    }
                });
            }
        });
    });

// PUT isteği için endpoint
app.put('/toDoList/:id', (req, res) => {
    const id = req.params.id; // Güncellenmek istenen öğenin ID'si
    const newData = req.body; // PUT isteğinden gelen yeni veriler

    // Dosyadaki verileri oku
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Veriler okunurken bir hata oluştu:', err);
            res.status(500).send('Veriler okunurken bir hata oluştu');
        } else {
            let todos = [];
            try {
                todos = JSON.parse(data); // Dosyadaki mevcut verileri bir dizi olarak al
            } catch (error) {
                console.error('Verileri ayrıştırırken bir hata oluştu:', error);
                res.status(500).send('Verileri ayrıştırırken bir hata oluştu');
                return;
            }

            // Belirtilen ID'ye sahip öğeyi güncelle
            const index = todos.findIndex(todo => todo.id == id);
            if (index !== -1) {
                todos[index] = { ...todos[index], ...newData };
            } else {
                console.error('Belirtilen ID ile eşleşen öğe bulunamadı');
                res.status(404).send('Belirtilen ID ile eşleşen öğe bulunamadı');
                return;
            }

            // Güncellenmiş verileri dosyaya yaz
            fs.writeFile('data.txt', JSON.stringify(todos), (err) => {
                if (err) {
                    console.error('Veriler dosyaya yazılırken bir hata oluştu:', err);
                    res.status(500).send('Veriler dosyaya yazılırken bir hata oluştu');
                } else {
                    console.log('Veriler başarıyla güncellendi');
                    res.status(200).send('Veriler başarıyla güncellendi');
                }
            });
        }
    });
});

// DELETE isteği için endpoint
app.delete('/toDoList/:id', (req, res) => {
    const id = req.params.id; // Silinmek istenen öğenin ID'si

    // Dosyadaki verileri oku
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Veriler okunurken bir hata oluştu:', err);
            res.status(500).send('Veriler okunurken bir hata oluştu');
        } else {
            let todos = [];
            try {
                todos = JSON.parse(data); // Dosyadaki mevcut verileri bir dizi olarak al
            } catch (error) {
                console.error('Verileri ayrıştırırken bir hata oluştu:', error);
                res.status(500).send('Verileri ayrıştırırken bir hata oluştu');
                return;
            }

            // Belirtilen ID'ye sahip öğeyi sil
            const index = todos.findIndex(todo => todo.id == id);
            if (index !== -1) {
                todos.splice(index, 1);
            } else {
                console.error('Belirtilen ID ile eşleşen öğe bulunamadı');
                res.status(404).send('Belirtilen ID ile eşleşen öğe bulunamadı');
                return;
            }

            // Güncellenmiş verileri dosyaya yaz
            fs.writeFile('data.txt', JSON.stringify(todos), (err) => {
                if (err) {
                    console.error('Veriler dosyaya yazılırken bir hata oluştu:', err);
                    res.status(500).send('Veriler dosyaya yazılırken bir hata oluştu');
                } else {
                    console.log('Veriler başarıyla güncellendi');
                    res.status(200).send('Veriler başarıyla güncellendi');
                }
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
