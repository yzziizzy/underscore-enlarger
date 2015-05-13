








function omap(obj, fn, out) {
	out = out || {};
	for(var k in obj) {
		if(!obj.hasOwnProperty(k)) continue;
		out[k] = fn(obj[k], k);
	}
	return out;
}

// map for objects. keys are preserved.
Object.defineProperty(Object.prototype, 'map', {
	enumerable: false,
	configurable: false,
	writable: false,
	value: function(fn, out) {
		return omap(this, fn, out);
	}
});

function oreduce(obj, fn, acc) {
	for(var k in obj) {
		if(!obj.hasOwnProperty(k)) continue;
		acc = fn(acc, obj[k], k);
	}
	return acc;
}

// reduce for objects.
Object.defineProperty(Object.prototype, 'reduce', {
	enumerable: false,
	configurable: false,
	writable: false,
	value: function(fn, acc) {
		return oreduce(this, fn, acc);
	}
});

// makes sure every property is an array
Object.defineProperty(Object.prototype, 'forceArray', {
	enumerable: false,
	configurable: false,
	writable: false,
	value: function() {
		for(var p in this) {
			if(!this.hasOwnProperty(p)) continue;
			if(!(this[p] instanceof Array))
				this[p] = [this[p]];
		}
		return this;
	}
});

// swap out keys for other keys
Object.defineProperty(Object.prototype, 'remapKeys', {
	enumerable: false,
	configurable: false,
	writable: false,
	value: function(table) {
		var out = {};
		for(var p in this) {
			if(!this.hasOwnProperty(p)) continue;
			
			var nk = table[p]
			out[nk || p] = this[p];
		}
		return out;
	}
});


// bad name. need new one. converts an object of arrays into a list of objects with 
//   their original key as the given property name.
Object.defineProperty(Object.prototype, 'unGroup', {
	enumerable: false,
	configurable: false,
	writable: false,
	value: function(keyName) {
		var out = [];
		for(var p in this) {
			if(!this.hasOwnProperty(p)) continue;
					  
			var arr = this[p];
			if(!(arr instanceof Array)) arr = [arr];
			
			out = out.concat(arr.map(function(x) {
				x[keyName] = p;
				return x;
			}));
		}
		return out;
	}
});


// opposite of pluck
Object.defineProperty(Array.prototype, 'sow', {
	enumerable: false,
	configurable: false,
	writable: false,
	value: function(prop, val) {
		for(var i = 0, len = this.length; i < length; i++) {
			this[i][prop] = val;
		}
		return this;
	}
});




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
Object.defineProperty(Array.prototype, 'objectMerge', {
	enumerable: false,
	configurable: false,
	writable: false,
	value: function(prop) {
		return this.reduce(function(acc, x) {
			for(var k in x) {
				if(!acc[k]) acc[k] = x[k];
				else acc[k] = acc[k].concat(x[k]);
			}
			return acc;
		}, {});
	}
});




module.exports = {
	
	omap: omap,
	oreduce: oreduce,
	
	
};
