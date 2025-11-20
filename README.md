<h1>📌 Automação de Distribuição de Empresas (n8n + Pipedrive)</h1>

<p>
  Este projeto implementa um fluxo automatizado no <strong>n8n</strong> para distribuir novas empresas entre analistas de Onboarding no <strong>Pipedrive</strong>, garantindo organização, velocidade e uma fila justa — eliminando o processo manual que antes dependia do líder da área.
</p>

<hr>

<h2>🚀 Contexto do Problema</h2>

<p>
  Antes da automação, novas empresas que chegavam ao funil de Onboarding Corporate eram atribuídas inicialmente ao líder. Ele precisava redistribuir manualmente para as analistas, verificando carga de trabalho, mult_empresas e disponibilidade.
</p>

<p>
  Por conta da rotina intensa, essa verificação muitas vezes acontecia apenas horas depois — ou até no dia seguinte — causando atrasos e filas desbalanceadas.
</p>

<hr>

<h2>🤖 A Solução</h2>

<p>
  Criei um fluxo que roda automaticamente <strong>a cada 1 hora (09h–18h, seg–sex)</strong> e:
</p>

<ul>
  <li>
    <strong>Busca todas as oportunidades atribuídas ao líder</strong><br>
    Usando a API do Pipedrive, o fluxo carrega todas as empresas que precisam ser distribuídas.
  </li>
  <li>
    <strong>Distribui entre analistas usando uma fila rotativa (round-robin)</strong><br>
    A fila garante divisão justa: a cada execução, a próxima analista recebe a empresa. 
    O estado da fila é salvo usando <strong>Static Data</strong> do n8n, para que continue da última distribuição.
  </li>
  <li>
    <strong>Identifica automaticamente multiempresas</strong><br>
    Se várias oportunidades possuem o mesmo código numérico, elas devem ir para a mesma analista.
    O fluxo salva no Static Data qual analista recebeu aquele código anteriormente.
  </li>
  <li>
    <strong>Atualiza o proprietário no Pipedrive</strong><br>
    Após definir a responsável, o fluxo envia um <code>PATCH</code> atualizando o dono da oportunidade no Pipedrive.
  </li>
  <li>
    <strong>Notifica o time no Mattermost</strong><br>
    O fluxo publica automaticamente:
    <ul>
      <li>Nome da empresa</li>
      <li>Link da oportunidade</li>
      <li>Analista mencionada</li>
      <li>Tipo (empresa única ou multiempresa)</li>
    </ul>
  </li>
</ul>

<hr>

<h2>🧠 Principais Tecnologias</h2>

<ul>
  <li><strong>n8n</strong> (automações e state management com Static Data)</li>
  <li><strong>JavaScript</strong> (regra da fila e lógica de multiempresa)</li>
  <li><strong>Pipedrive API</strong></li>
  <li><strong>Mattermost API</strong></li>
</ul>

<hr>

<h2>🎯 Impacto</h2>

<ul>
  <li>Distribuição automática, organizada e sem atrasos</li>
  <li>Fila de analistas sempre justa</li>
  <li>Multiempresas centralizadas corretamente</li>
  <li>Time notificado em tempo real</li>
  <li>Liderança liberada de uma tarefa manual recorrente</li>
  <li>Redução significativa de tempo e erros</li>
</ul>

<hr>

<h2>🗂 Workflow</h2>

![n8n-workflow](https://raw.githubusercontent.com/jeniferzakka/distribuicao-empresas-n8n-pipedrive/main/n8n-workflow.jpg)

<p>
</p>
