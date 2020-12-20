# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- Ousuário deve poder resetar sua senha;

**RNF**

- Utilizar o mailtrap para testar envios em ambiente de dev;
- Utilizar o Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização de perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;
**RNF**

**RN**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar a senha, o usário deve informar a senha antiga;
- Para atualizar a senha, o usuário precisa confirmar a nova;

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia deve ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações devem ser enviadas em tempo-real utilizando socket.io;

**RN**

- A notificação deve ter um status de lida ou não lida, que o prestador deve poder controlar;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponivel de um prestador;
- O usuário deve poder listar os horários disponiveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar um 1h exatamente;
- Os agendamentos devem estar disponiveis entre 8h e 18h (Primeiro às 8h, ultimo as 17h);
- O usuário não pode agendar um horário ocupado;
- O usuário não pode agendar um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;



Guia

1. Rotas e controllers
2. Repositorio de tokens no typeorm
3. Criar Migration de tokens
4. provider de envio de email(dev)
5. Registrar Providers no containers
6. Testar tudo
