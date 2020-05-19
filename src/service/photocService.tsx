import c2s from '../utils/http';

const photocService = {    
  orderStats (option:any) {        
      return c2s({
        url:'/order-stats',
        ...option,
      });    
  },
  
}

export default photocService;

