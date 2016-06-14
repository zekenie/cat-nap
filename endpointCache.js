// const _ = require('lodash');
// class EndpointCache {
//   constructor() {
//     // map of lamdas => cache maps
//     this.data = new Map();

//     // map of labels => lamdas
//     this.lamdas = new Map();
//   }

//   createCache(label, lamda, unique=false) {
//     this.lamdas.set(label, lamda);
//     this.data.set(lamda, new Map());
//     this.records.forEach(record => {
//       this.cacheDoc(lamda, doc, unique)
//     });
    
//   }

//   cacheDoc(lamda, doc, unique) {
//     const cache = this.data.get(lamda);
//     const bucket = lamda.call(this, record);
//     if(unique) {
//       cache.set(bucket, record);
//     } else {
//       if(!cache.has(bucket)) {
//         cache.set(bucket, new Set());
//       }
//       cache.get(bucket).add(record);
//     }
//   }

//   add(doc) {

//   }
// }

