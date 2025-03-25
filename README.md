# Badword API

https://github.com/user-attachments/assets/a7d1f79f-58fa-4494-af18-37a882160ac9

Uma API robusta para detecção de palavras ofensivas utilizando inteligência artificial.

## 🚀 Tecnologias Utilizadas

- **NestJS** - Framework para Node.js
- **Gemini API** - Para análise de palavras ofensivas
- **TypeScript** - Tipagem segura
- **Docker** - Para fácil implantação

## 📦 Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/badword-api.git
   cd badword-api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo `.env`:
   ```env
   AI_API_KEY=sua-chave-aqui
   PORT=3000
   ```

## ▶️ Como Rodar

### Desenvolvimento
```bash
npm run start:dev
```

### Produção
```bash
npm run build
npm run start
```

### Utilizando Docker
```bash
docker build -t badword-api .
docker run -p 3000:3000 badword-api
```

## 🔥 Endpoints

### 🔍 Verificar se uma mensagem contém palavras ofensivas
**POST /badword**

#### 📌 Exemplo de Requisição:
```json
{
  "text": "sua mensagem aqui",
}
```

#### 📌 Exemplo de Resposta:
```json
{
  "isBadword": true
}
```

## 📜 Licença
Este projeto está sob a licença MIT.

