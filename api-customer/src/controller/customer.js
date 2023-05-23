const axios = require('axios');
const _ = require('lodash'); 
const db = require('../database/db');

const getCustomer = async (req, res) => {
    const { params } = req;
    if(!params.cusID) {
        try {
            const  conn = await db.getConnection();
            const result = await conn.query(`SELECT * FROM CUSTOMER`);
            return res.json(result) 
                
            } catch (error) {
                return res.json({
                    error: `Get customer failed`
                })
            } 
    }
    else {
        try {
        const  conn = await db.getConnection();
        const result = await conn.query(`SELECT * FROM CUSTOMER WHERE id = ${params.cusID}`);
        return res.json(result) 
            
        } catch (error) {
            return res.json({
                error: `Get customer failed`
            })
        } 
        }
}

const addPoint = async (req, res) => {
    const { params } = req;
    try {
        const  conn = await db.getConnection();
        const result = await conn.query(`UPDATE CUSTOMER SET POINT = POINT + ${params.point}  WHERE id = ${params.cusID}`);
        if (result) return res.sendStatus(200)
            
        } catch (error) {
            if (error) return res.json({ 
                error: `Add point failed`
            })
        } 
}
module.exports = { getCustomer, addPoint }