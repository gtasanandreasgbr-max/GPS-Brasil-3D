# GPS Brasil - Mapa de Ruas 2D

Esta versão substitui o mapa 3D pela visualização 2D, de cima, com ruas e ponto azul de localização.

## Arquivos
- `index.html` - mapa 2D, interface e acompanhamento contínuo do GPS.
- `manifest.json` - configuração de instalação PWA.
- `sw.js` - cache dos arquivos básicos do aplicativo.

## Publicar no mesmo repositório GitHub
1. Extraia este ZIP.
2. Abra seu repositório `gps-brasil-3d` (ou o nome que você escolheu).
3. Substitua os arquivos antigos pelos três arquivos desta versão.
4. Faça commit das alterações.
5. Aguarde o GitHub Pages atualizar e abra o site em HTTPS.

## Como testar
1. Abra o site em um celular.
2. Permita o acesso à localização.
3. Toque em "Iniciar localização".
4. O ponto azul acompanhará as atualizações do GPS enquanto você caminha.
5. Toque em "Parar" para encerrar o acompanhamento.

## Importante sobre o funcionamento offline
Esta versão usa blocos de mapa do OpenStreetMap e carrega a biblioteca Leaflet pela internet. O Service Worker guarda somente os arquivos básicos do aplicativo. Portanto, o mapa de ruas ainda precisa de internet nesta etapa.

O GPS do aparelho pode receber coordenadas sem internet, dependendo do dispositivo, da recepção dos satélites e das permissões. Para visualizar ruas sem conexão, será necessário adicionar pacotes de mapas offline, armazenados no aparelho, com fonte e licença adequadas. Não faça download em massa nem pré-carregamento dos servidores públicos padrão do OpenStreetMap.

## Observações
- O mapa é 2D, visto de cima, sem inclinação ou edifícios 3D.
- O ponto azul indica a posição informada pelo aparelho; o círculo representa a precisão aproximada.
- O navegador normalmente exige HTTPS para liberar a geolocalização.
