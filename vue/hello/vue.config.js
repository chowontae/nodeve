module.exports = {
	outputDir: '../backend/public', 
	//assetsDir: '', 
	indexPath: 'index.html', 		
	devServer:{
		port: 80, 
		https: false, 
	    proxy: {
	        '^/apis': {
	          target: 'http://localhost/apis',
	          ws: true,
	          changeOrigin: true
	        }
	      }		
	}
}