# GPS Brasil 3D

Primeira versão do aplicativo GPS para GitHub Pages.

## Arquivos
- `index.html`: interface, mapa e localização do aparelho.
- `manifest.json`: configura a instalação como aplicativo PWA.
- `sw.js`: guarda os arquivos locais básicos para abrir a interface novamente.

## Publicar no GitHub Pages
1. Crie um repositório público chamado `gps-brasil-3d`.
2. Envie os três arquivos para a raiz do repositório.
3. Abra Settings > Pages.
4. Em Build and deployment, selecione Deploy from a branch.
5. Selecione a branch `main` e a pasta `/ (root)`.
6. Salve e aguarde o endereço do GitHub Pages.

## Teste
- Abra o endereço publicado usando HTTPS.
- Permita o acesso à localização quando o navegador solicitar.
- Toque em “Minha localização”.
- O GPS do aparelho fornece coordenadas; o navegador precisa de permissão.
- O teste de GPS deve ser feito em um celular com GPS ativo.

## Limitações desta versão
- O mapa de satélite usa uma camada online de demonstração Sentinel-2/EOX.
- A inclinação do mapa cria perspectiva visual; ainda não é relevo 3D real.
- O Service Worker guarda apenas os arquivos locais do aplicativo. Ele NÃO baixa nem armazena o mapa de satélite.
- A biblioteca MapLibre é carregada por CDN nesta versão inicial.
- Portanto, esta versão ainda NÃO oferece mapa offline. Para isso será necessário adicionar a biblioteca local e pacotes de mapas offline, respeitando a licença e as condições do fornecedor das imagens.
- O GPS pode obter coordenadas sem internet em aparelhos com receptor GNSS, mas a precisão e o tempo de localização variam conforme o aparelho e o ambiente.

## Próxima etapa
Preparar armazenamento e leitura de pacotes offline de mapas para regiões do Brasil. O Brasil inteiro em alta resolução por satélite ocupa muito espaço; o ideal é permitir baixar áreas por região.
