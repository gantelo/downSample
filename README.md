array-downsample: Downsample array of numbers
================================================

* Author: Gabriel Antelo
* Special thanks: [Sveinn Steinarsson](https://github.com/sveinn-steinarsson/flot-downsample)
* And: [Matej Drolc](https://github.com/pingec/downsample-lttb)

This is a downsample of numbers function taken from the "Largest-Triangle-Three-Buckets or LTTB" algorithm designed by Sveinn Steinarsson. 
Adapted to typescript and dropping the need to use points in a future.

# Instructions

Install with

	npm i downsample-lttb-ts
or
    
    yarn add downsample-lttb-ts

Usage example

    import { downsample } from 'downsample-lttb-ts';
	
	//provide a series as an array of [x,y] pairs
	const dummyDataSeries = [[1,2],[2,2],[3,3],[4,3],[5,6],[6,3],[7,3],[8,5],[9,4],[10,4],[11,1],[12,2]];

	//pass the series and number of desired datapoints
	const downsampledSeries = downsample(dummyDataSeries, 3);
	
	console.log(downsampledSeries);	
	//outputs [ [ 1, 2 ], [ 5, 6 ], [ 12, 2 ] ]