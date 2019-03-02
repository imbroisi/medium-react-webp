React: use imagens webp já.

Certo, gostamos e queremos React por diversos motivos. Eficiência é um deles. Mas se queremos tanto eficiência, por que ainda usamos imagens jpeg e png em nosso projetos? As imagens no formato wpeg conseguem, com a mesma qualidade, uma redução em média de 30% a 50% nos tamanhos comparados com png/jpeg - ou mesmo muito além disso em certas circunstâncias.
Os motivos "contra" wpeg, que tenho encontrado normalmente pesquisando por aí, são:
 "O que é mesmo wpeg?"
Muita gente não sabe que existe este tipo de imagem, que ela é excelente para se usar na Web, melhor do que png e jpeg. Ela é um padrão de imagens de código aberto, criado e mantido pelo Google. Você pode conhecer detalhadamente sobre wpeg em: developers.google.com/speed/webp/
"Mas nem todo browser suporta wpeg."
Sim, é verdade. Faz parte da tecnologia de Internet que os novos padrões não sejam adotados imediatamente. Bem, wpeg não é tão novo assim, ele já existe há anos. Os browsers modernos reconhecem o wpeg faz tempo.
No momento que este texto está sendo escrito, estes são alguns browsers com wpeg: Chrome (ufa!), Firefox, Edge, Opera. 
Ok, mas nem todos. Então continue lendo, por favor.
"Mas e os browser que não suportam wpeg?"
Ainda existe uma minoria de usuários que usa browser não compatíveis. Neste caso pode-se usar a técnica que eu uso em meus projetos com React. 
O browser aceita wpeg? Manda wpeg pra ele.
O browser não aceita wpeg? Manda png/jpeg.
Simples assim.
"Ah, não é tão simples assim."
Bem, certo, é simples depois que está funcionando, não é mesmo? 

A implementação deste processo é o motivo deste artigo. No final passarei um link no Gihub com todo o código funcionando dentro de um projeto-exemplo, pronto para ser reutilizado no seu projeto.
Componente React
O componente React é o ImageWebp, que será incluído no seu projeto em substituição à chamada normal da tag img, agora contemplando a opção de carregamento prioritário da imagem no formato wpeg, quando o browser for compatível.
Por exemplo:
Substituindo <img /> por <ImageWebp />Com isso, ao renderizar o componente, o React verifica se o browser é compatível com wpeg, renderizando então com srcWebp. Caso contrário, renderiza com src.
Identificando se o browser suporta Webp.
O React precisa tomar uma decisão sobre qual tipo de arquivo servir, para uma determina imagem solicitada, conforme visto acima. Isto é feito com este código Javascript (versão simplificada para melhor entendimento):
Detect webp compatibilityÉ interessante notar que a variável de controle isWebpAlphaCompatible é carregada de forma assíncrona.
Apesar do carregamento ser quase instantâneo, pois os valores estão diretamente no código, durante a construção do componente React é preciso considerar que o carregamento é assíncrono.
Gerando imagens webp
Existem basicamente dois meios de se gerar imagens no formato webp:
1) Exportando diretamente sua image original no formato webp.
Os editores de imagem profissionais, como o Photoshop, já possuem a opção de exportar sua imagem no formato webp.
2) Convertendo sua imagem original.
O Google disponibiliza gratuitamente, no mesmo link lá no início, um programa que converte jpeg e png em webp. E não se preocupe, no nosso projeto-exemplo no Github você terá um script que fará todo o trabalho de gerar automaticamente todas as suas imagens a partir das png/jpeg já existentes.
Tanto na exportação quanto na conversão, existem alguns parâmetros que servem para otimizar a imagem a ser gerada, ajudando a manter uma boa relação entre qualidade e tamanho. Estas são os três tipos de compressão mais utilizados:
Lossy: A compressão lossy é baseada no VP8 key frame encoding. VP8 é um formato de compressão criado pela On2 Technologies, como sucessor dos formatos VP6 e VP7. Este formato admite uma pequena perda de qualidade (configurável), com considerável diminuição no tamanho da imagem.
Lossless: A compressão lossless foi desenvolvido pela equipe do WebP, e trabalha com perdas de qualidade insignificantes, mas gerando arquivos maiores.
Transparency: útil para imagens gráficas, usando 8-bit alpha channel. O Alpha channel funciona apenas para compressão lossy.

Você pode testar compressões e fatores de qualidades diferentes para atender às suas necessidades, mas normalmente os valores usados no projeto-exemplo se mostram eficientes na maioria dos casos.
Script para conversão automática
Dentro do projeto-exemplo é disponibiliazado um script que, de forma automática, varre todo o seu projeto à procura de imagens, e gera as imagens webp. 
Para imagens jpeg, é gerada uma imagem com compressão lossy, que terá no mínimo 30% de redução de tamanho no arquivo. 
Para png, são geradas duas imagens: uma com compressão lossyless e uma com compressão lossy transparente. Assim vc pode decidir, caso a caso, qual dos dois formatos é mais adequado para uma determinada imagem png. Isso porque dependendo da imagem png, um formato pode gerar uma webp com melhor relação qualidade/tamanho