# Scénario du protocole général
## NFC
### changement de l'état de la porte
L'utilisateur pose son téléphone sur le lecteur NFC --> Le téléphone envoie la trame au lecteur NFC--> le lecteur NFC envoie la trame à la Raspberry qui est connecté en GPIO --> La Raspberry traîte la trame (récupération de l'ID de l'utilisateur) avec un script Python --> La Raspberry envoie l'ID au serveur sous format JSON en HTTP --> Le serveur traîte la requête en Javascript et consulte la base de données (regarde si l'ID a les accès d'ouverture de la porte) en SQL --> Le serveur actualise la base de données en SQL, puis actualise le script de l'interface web en fonction de la réponse [/!\ A DETAILLER(historique, état de la porte ..)] en Javascript
--> Le serveur envoie la réponse à la Rapsberry sous format JSON en HTTP (True ou False) --> La Raspberry traîte la réponse --> La Raspberry donne un signal à la gâche électrique en GPIO si la réponse est True, sinon allume la LED rouge

## Web
### changement de l'état de la porte
L'utilisateur change l'état de la porte sur l'application --> Le serveur traîte la requête en Javascript et consulte la base de données (regarde si l'ID a les accès d'ouverture de la porte) en SQL --> Le serveur actualise la base de données en SQL, puis actualise le script de l'interface web en fonction de la réponse [/!\ A DETAILLER(historique, état de la porte ..)] en Javascript
--> Le serveur envoie la réponse à la Rapsberry sous format JSON en HTTP (True ou False) --> La Raspberry traîte la réponse --> La Raspberry donne un signal à la gâche électrique en GPIO si la réponse est True, sinon allume la LED rouge

### changement des autorisations invités
L'utilisateur change l'état de la porte sur l'application --> Le serveur traîte la requête en Javascript et consulte la base de données (regarde si l'ID a les accès d'ouverture de la porte) en SQL --> Le serveur actualise la base de données en SQL, puis actualise le script de l'interface web en fonction de la réponse [/!\ A DETAILLER(historique, autorisations ..)] en Javascript