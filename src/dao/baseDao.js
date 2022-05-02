class BaseDao {
    constructor(model) {
      this.model = model;
    }
  
    /**
     * findOne a single document
     * @param filter
     * @param projection
     * @returns {Promise}
     */
    findOne(filter, projection) {
      return this.model.findOne(filter, projection).lean().exec();
    }
  
    /**
     * find more than one document
     * @param filter
     * @param projection
     * @returns {Promise}
     */
    findMany(filter, projection) {
      return this.model.find(filter, projection).lean().exec();
    }
  
    /**
     * updateOne a single doc
     * @param filter
     * @param docToUpdate
     * @param options
     * @returns {Promise}
    */
    updateOne(filter, docToUpdate, options = { returnOriginal: false }) {
      if (options.returnOriginal) {
        return this.model.findOneAndUpdate(filter, docToUpdate, options);
      }
      return this.model.updateOne(filter, docToUpdate, options);
    }
  
    /**
     * insertOne a single doc
     * @param doc
     * @returns {Promise}
     */
    insertOne(doc) {
      return this.model.insertOne(doc);
    }
  
    /**
     * remove a single doc
     * @param doc
     * @returns {Promise}
     */
    removeOne(doc) {
      return this.model.remove(doc);
    }
  
    /**
     * remove more than one doc
     * @param doc
     * @returns {Promise}
     */
    removeMany(doc) {
      return this.model.removeMany(doc);
    }
  
    deleteOne(doc) {
      return this.model.deleteOne(doc);
    }
  
    deleteMany(doc) {
      return this.model.deleteMany(doc);
    }
  
    findCount(filter) {
      return this.model.find(filter).countDocuments();
    }
  
    aggregationQuery(query) {
      return this.model.aggregate(query).allowDiskUse(true);
    }
  
    findOneAndUpdate(query, data) {
      return this.model.findOneAndUpdate(query, data, { new: true });
    }
  
    findOneAndRemove(query) {
      return this.model.findOneAndRemove(query);
    }
  }
  
export default BaseDao;
  