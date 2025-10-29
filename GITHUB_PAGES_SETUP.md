# 🚀 Como Publicar no GitHub Pages - Guia Passo-a-Passo

## 📋 **Pré-requisitos**
✅ Git instalado (já verificado)  
✅ Conta no GitHub (criar em https://github.com se necessário)  
✅ Projeto preparado (✅ Concluído!)

---

## 🌐 **PASSO 1: Criar Repositório no GitHub**

1. **Ir para o GitHub**:
   - Abra https://github.com no navegador
   - Faça login na sua conta

2. **Criar Novo Repositório**:
   - Clique no botão verde "New" ou "+" no topo direito
   - Selecione "New repository"

3. **Configurar Repositório**:
   ```
   Repository name: espaco-sensorial
   Description: Website profissional do Espaço Sensorial - Desenvolvimento Infantil
   Visibility: ✅ Public (necessário para GitHub Pages gratuito)
   
   ✅ REPOSITÓRIO JÁ CRIADO: https://github.com/gabetozarin/espaco-sensorial
   
   ❌ NÃO marcar "Add a README file"
   ❌ NÃO marcar "Add .gitignore"  
   ❌ NÃO marcar "Choose a license"
   ```

4. **Criar Repositório**:
   - Clique em "Create repository"
   - **COPIE** a URL que aparece (exemplo: https://github.com/SEUUSERNAME/espaco-sensorial.git)

---

## 📤 **PASSO 2: Enviar Código para o GitHub**

1. **No PowerShell (nesta pasta), execute estes comandos:**

```powershell
# ✅ JÁ EXECUTADO! Código enviado com sucesso para:
# https://github.com/gabetozarin/espaco-sensorial.git

git remote add origin https://github.com/gabetozarin/espaco-sensorial.git
git push -u origin main
```

2. **Se pedir login**:
   - Username: seu nome de usuário do GitHub
   - Password: use um "Personal Access Token" (não a senha normal)
   
3. **Para criar Personal Access Token**:
   - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate new token → marque "repo" → Generate token
   - COPIE o token e use como senha

---

## 🌍 **PASSO 3: Ativar GitHub Pages**

1. **No repositório do GitHub**:
   - Vá para "Settings" (tab no topo)
   - Role até encontrar "Pages" no menu lateral esquerdo

2. **Configurar Pages**:
   ```
   Source: Deploy from a branch
   Branch: main
   Folder: / (root)
   ```

3. **Salvar**:
   - Clique em "Save"
   - Aguarde 2-5 minutos

4. **Acessar Website**:
   - URL será: `https://gabetozarin.github.io/espaco-sensorial`
   - O GitHub mostrará o link quando estiver pronto

---

## 🔄 **PASSO 4: Fazer Alterações (Futuras)**

Sempre que quiser atualizar o website:

```powershell
# 1. Fazer suas alterações nos arquivos
# 2. Adicionar ao Git
git add .

# 3. Fazer commit
git commit -m "Descrição da alteração"

# 4. Enviar para GitHub
git push origin main
```

💡 **O GitHub Pages atualizará automaticamente em 1-2 minutos!**

---

## ✅ **VERIFICAÇÃO FINAL**

Após seguir todos os passos:

1. ✅ Repositório criado no GitHub
2. ✅ Código enviado com sucesso  
3. ✅ GitHub Pages ativado
4. ✅ Website acessível online
5. ✅ URL funcionando: `https://gabetozarin.github.io/espaco-sensorial`

---

## 🆘 **Resolução de Problemas**

**❌ Erro de autenticação?**
- Use Personal Access Token como senha

**❌ Website não carrega?**
- Aguarde 5-10 minutos
- Verifique se o repositório é público
- Confirme que o branch é "main"

**❌ Código não enviou?**
- Verifique se a URL do repositório está correta
- Confirme que tem permissões no repositório

---

## 🎉 **PRÓXIMOS PASSOS**

1. **Domínio próprio** (opcional):
   - GitHub Pages permite usar domínio personalizado
   - Ex: www.espacosensorial.pt

2. **Analytics**:
   - Adicionar Google Analytics ao código

3. **SEO**:
   - Submeter aos motores de busca

**🌟 O website está pronto para impressionar o cliente!**