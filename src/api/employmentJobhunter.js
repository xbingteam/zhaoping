/*
 * @Author: weiyc 
 * @Date: 2019-12-25 16:08:05 
 * @Last Modified by: weiyc
 * @Last Modified time: 2019-12-26 14:49:49
 */


import axios from '@/utils/axios'

/* 查找数据 */
export async function findAllEmploymentJobhunter() {
    return await axios.get('/EmploymentJobhunter/findAll');
  }
  export async function findAllWithJobhAndEmpl() {
    return await axios.get('/EmploymentJobhunter/findAllWithJobhAndEmpl');
  }
