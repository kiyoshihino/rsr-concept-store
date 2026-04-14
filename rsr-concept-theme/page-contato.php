<?php
/* Template Name: Contato */
get_header(); ?>

<div class="contato_page">
  <div class="contato_hero">
    <h1 class="contato_title">Fale Conosco</h1>
    <p class="contato_subtitle">Estamos sempre prontas para ajudar</p>
  </div>

  <div class="contato_content">
    <div class="contato_info">
      <div class="contato_infoItem">
        <h3>Email</h3>
        <p><a href="mailto:rborimsouza@gmail.com" style="color: inherit; text-decoration: none;">rborimsouza@gmail.com</a></p>
      </div>
      <div class="contato_infoItem">
        <h3>WhatsApp</h3>
        <p><a href="https://wa.me/5543999949787" target="_blank" style="color: inherit; text-decoration: none;">(43) 9 9994-9787</a></p>
      </div>
      <div class="contato_infoItem">
        <h3>Horário</h3>
        <p>Seg a Sex: 9h às 18h</p>
      </div>
      <div class="contato_infoItem">
        <h3>Localização</h3>
        <p>Londrina-PR</p>
      </div>
    </div>

    <form class="contato_form" action="#" method="POST">
      <div class="contato_formGroup">
        <label for="name">Nome</label>
        <input type="text" id="name" name="name" required class="contato_input" />
      </div>

      <div class="contato_formGroup">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required class="contato_input" />
      </div>

      <div class="contato_formGroup">
        <label for="subject">Assunto</label>
        <select id="subject" name="subject" required class="contato_input">
          <option value="">Selecione um assunto</option>
          <option value="pedido">Pedido / Rastreio</option>
          <option value="uniformes">Orçamento Uniformes Escolares</option>
          <option value="encomenda-croche">Encomendas Especiais (Tricô/Crochê)</option>
          <option value="fitness">Dúvida sobre Moda Fitness</option>
          <option value="duvida">Dúvidas Gerais</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      <div class="contato_formGroup">
        <label for="message">Mensagem</label>
        <textarea id="message" name="message" required rows="6" class="contato_textarea"></textarea>
      </div>

      <button type="submit" class="contato_submitButton">
        Enviar Mensagem
      </button>
    </form>
  </div>
</div>

<?php get_footer(); ?>
