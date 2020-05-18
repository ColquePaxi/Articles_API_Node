'use strict';

/***************
 * Log file hook
 */

const fs = require('fs');

module.exports = strapi => {
    return {
        
        initialize() {
            // Inicializa o hook: pega o conteúdo que foi definido lá no request.json    
            const {
		level,
		exposeInContext,
		requests,
	    } = strapi.config.middleware.settings.logger;

            let logFile = null;
            let logStream = null;

            // Define a pasta / diretório onde será gravado o log
            const dir = process.cwd();
            const log = '//log//';            
            const path = dir + log;

            // Interage com a variável de ambiente NODE_ENV e define o nome do arquivo
            if (process.env.NODE_ENV === 'production') {
                logFile = path + 'prod.log';
            } else {
                logFile = path + 'logger.log';
            }

            console.log(logFile);

            // Aponta o Stream que escreverá os logs no arquivo anteriormente definido
            // O parâmetro 'a' diz que vai ser do tipo Append (acrescenta uma linha no final do arquivo)
            logStream = fs.createWriteStream(logFile, { flags: 'a' });

            // Pega o nível de log que veio lá do request.json
            if (level) {
		strapi.log.level = strapi.config.middleware.settings.logger.level;
		logStream.write('Log Level => ' + strapi.log.level + '\n');
	    }

            // Pega o parâmetro de contexto que veio lá do request.json
            if (exposeInContext) {
                strapi.app.context.log = strapi.log;
            }

            // Pega o requests que veio lá do request.json
            // Se a chave estiver como TRUE os dados de todas as requisições serão escritos no log de arquivo 
            if (requests) {
                strapi.app.use(async(ctx, next) => {
                    const start = Date.now();
                    await next();
                    const delta = Math.ceil(Date.now() - start);
                    // Data no formato Timestamp
                    const dt = new Date().toJSON();
                    // Escrevendo o que queremos ver no log
                    logStream.write(`[${dt}] ${ctx.method} ${ctx.url} (${delta}) ms ${ctx.status}` + `\n`);
                });
            }

        }

        
    }
}
