





module.exports = function(_) {
	
	
	
	// map for objects. keys are preserved
	_.omap = function(obj, fn, out) {
		out = out || {};
		for(var k in obj) {
			if(!obj.hasOwnProperty(k)) continue;
			out[k] = fn(obj[k], k);
		}
		return out;
	};
	
	// reduce for objects.
	_.oreduce = function(obj, fn, acc) {
		for(var k in obj) {
			if(!obj.hasOwnProperty(k)) continue;
			acc = fn(acc, obj[k], k);
		}
		return acc;
	};




	// makes sure every property is an array
	_.forceArray = function(obj) {
		for(var p in obj) {
			if(!obj.hasOwnProperty(p)) continue;
			if(!(obj[p] instanceof Array))
				obj[p] = [obj[p]];
		}
		return obj;
	};

	// swap out keys for other keys
	_.remapKeys = function(obj, table) {
		var out = {};
		for(var p in obj) {
			if(!obj.hasOwnProperty(p)) continue;
			
			var nk = table[p]
			out[nk || p] = obj[p];
		}
		return out;
	};


	// bad name. need new one. converts an object of arrays into a list of objects with 
	//   their original key as the given property name.
	_.unGroup = function(obj, keyName) {
		var out = [];
		for(var p in obj) {
			if(!obj.hasOwnProperty(p)) continue;
					  
			var arr = obj[p];
			if(!(arr instanceof Array)) arr = [arr];
			
			out = out.concat(arr.map(function(x) {
				x[keyName] = p;
				return x;
			}));
		}
		return out;
	};



	// opposite of pluck
	_.sow = function(arr, prop, val) {
		for(var i = 0, len = arr.length; i < length; i++) {
			arr[i][prop] = val;
		}
		return arr;
	};




	// merges an array of objects of arrays into one object of concatenated arrays by key. nonrecursive.
	/*
	[
		{ 
			a: [1, 2, 3], 
			b: [4, 5]
		}, 
		{ 
			a: [6, 7], 
			c: [8, 9, 10, 11]
		}
	]
	gets turned into:
	{ 
		a: [1, 2, 3, 6, 7], 
		b: [4, 5],
		c: [8, 9, 10, 11]
	}

	*/
	_.objectMerge = function(arr, prop) {
		return arr.reduce(function(acc, x) {
			for(var k in x) {
				if(!acc[k]) acc[k] = x[k];
				else acc[k] = acc[k].concat(x[k]);
			}
			return acc;
		}, {});
	};
	
	return _;
}


