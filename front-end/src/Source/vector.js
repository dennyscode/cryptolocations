import { Vector as VectorSource } from 'ol/source';

function vector({ features }) {
	console.log("VECTOR:")
	console.log({features})
	return new VectorSource({
		features
	});
}

export default vector;
