const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
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
      return ctx.unauthorized(`Vocẽ não pode alterar esse Artigo`);
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

    let article;
    
    if (ctx.state.user.role.name === 'Admin') {
      article = await strapi.services.article.find({
        id: ctx.params.id
      });
    } else {
      article = await strapi.services.article.find({
        id: ctx.params.id,
        'author.id': ctx.state.user.id,
      });
    }

    if (!article) {
      return ctx.unauthorized(`Vocẽ não pode deletar esse Artigo`);
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
  },  

};
