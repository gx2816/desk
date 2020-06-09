import c2s from '../utils/http';

const photocService = {    
  incomeData (option:any) {        
      return c2s({
        url:'/barracks/platform',
        ...option,
      });    
  },
  incomeYear (option:any) {        
      return c2s({
        url:'/barracks/platform/year',
        ...option,
      });    
  },
  
}

export default photocService;

