/*'use strict';*/

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {

  /*
   * Pegar o path da API e gerar alguns logs customizados
   * Pode usar ctx. O arquivo config/environments/<<ambiente>>/request.json está configurado para expor
   * "exposeInContext": true,
   */

   basePath: async (ctx) => {
     try {
        const dir = process.cwd();
        strapi.log.info("Info");
        strapi.log.fatal("Fatal");
        strapi.log.error("Error");
        strapi.log.warn("Warn");
        strapi.log.debug("Debug");
        ctx.send(dir);
     } catch (error) {
        strapi.log.fatal(error);
        ctx.badImplementation(error.message);
     }
   },


  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
 
    console.log('ctx.request.body.author: ' + ctx.request.body.author);
    console.log('ctx.state.user.id: ' + ctx.state.user.id);
    console.log(ctx.is('multipart'));

    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      data.author = ctx.state.user.id;
      entity = await strapi.services.article.create(data, { files });
    } else {
      ctx.request.body.author = ctx.state.user.id;
      entity = await strapi.services.article.create(ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.article });
  },

  /**
   * Update a record.
   *
   * @return {Object}
   */

  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const [article] = await strapi.services.article.find({
      id: ctx.params.id,
      'author.id': ctx.state.user.id,
    });

    if (!article) {
      return ctx.unauthorized(`Você não pode alterar esse Artigo`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.article.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.article.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.article });
  },


  /**
   * Delete a record.
   *
   * @return {Object}
   */

  async delete(ctx) {
    const { id } = ctx.params;

    let entity;

    const [article] = await strapi.services.article.find({
      id: ctx.params.id,
      'author.id': ctx.state.user.id,
    });

    if (!article) {
      return ctx.unauthorized(`Você não pode deletar esse registro`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.article.delete({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.article.delete({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.article });
  }

};
