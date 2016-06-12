import resolveId from 'resolve';

export default function(modules) {
  var resolved = {};

  Object.keys(modules).forEach(function(name) {
    resolved[name] = new Promise(function(resolve, reject) {
      resolveId(modules[name], function(err, resolved) {
        if (err) {
          reject(err);
        } else {
          resolve(resolved);
        }
      });
    });
  });

  return {
    resolveId: function(importee, importer) {
      return importee in resolved ? resolved[importee] : null;
    }
  };
};
