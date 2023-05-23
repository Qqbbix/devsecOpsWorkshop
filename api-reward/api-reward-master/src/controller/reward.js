const axios = require('axios');
const _ = require('lodash'); 
const db = require('../database/db');

const getReward = async (req, res) => {
    const { params } = req;
    let conn
    try {
        conn = await db.getConnection();
        let result
    if(!params.rewardID) result = await conn.query(`SELECT * FROM REWARD`);
    else result = await conn.query(`SELECT * FROM REWARD WHERE ID = ${params.rewardID}`);

    if (_.isEmpty(result)) return res.status(404).json({error: 'Reward not found'})
    const reward = result.map(item => ({
        id: item.ID,
        name: item.NAME,
        amount: item.AMOUNT,
        balance: item.BALANCE,
        point: item.POINT,
        image: Buffer.from(item.IMAGE).toString('base64'),
        active: item.ACTIVE,
        addDate: item.ADD_DATE,
        updateDate: item.UPDATE_DATE
    }))
    return res.status(200).json(reward) 

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: null
        })
    } finally {
        if (conn) conn.end();
    }  
}
const addReward = async (req, res) => {
    let conn
    try {
        conn = await db.getConnection();
        const result = await conn.query(`INSERT INTO REWARD (NAME, AMOUNT, BALANCE, POINT, IMAGE, ACTIVE, ADD_DATE, UPDATE_DATE) VALUES ( 
        '${req.body.name}',
        '${req.body.amount}',
        '${req.body.balance}',
        '${req.body.point}',
        '${req.body.image}',
        '${req.body.active}',
        '${req.body.addDate}','')`);
        if (result) return res.sendStatus(200)
            
        } catch (error) {
            if (error) return res.json({error: error.massage})
        } finally {
            if (conn) conn.end();
        }  
}
const updateReward = async (req, res) => {
    let conn
    try {
        conn = await db.getConnection();
        const result = await conn.query(`UPDATE reward SET 
        NAME = ${req.body.name},
        AMOUNT = ${req.body.amount},
        BALANCE = ${req.body.balance},
        POINT = ${req.body.point},
        IMAGE = ${req.body.image},
        ACTIVE = ${req.body.active},
        WHERE id = ${req.body.rewardID}`);
        if (result) return res.sendStatus(200)
            
        } catch (error) {
            if (error) return res.json({error})
        } finally {
            if (conn) conn.end();
        }   
}
const redeemReward = async (req, res) => {
    // check input
    const { params } = req;
    let reward
    const payload = req.body;
    if (!params.rewardID) return res.status(400).json({error: 'Missing rewardID'})
    if (!payload) return res.status(400).json({error: 'Missing payload'})
    // check balance reward
    let conn
    try {
        conn = await db.getConnection();
        reward = await conn.query(`SELECT * FROM REWARD WHERE ID = ${params.rewardID}`);
        if (reward[0].BALANCE <= 0) return res.json({error: 'Reward is empty'})
    }
    catch (error) {
        return res.json({error: error.message})}
        finally {
            // Close Connection
            if (conn) conn.end();
        } 
    // insert tran to give or redeem decrease user point, balance
   try {
    conn = await db.getConnection();
    // Start Transaction
    await   conn.beginTransaction();
    try {
       // Add Data in give or redeem
       await conn.query(`INSERT INTO GIVE_RO_REDEEM (TRAN_TYPE, CUSTOMER_ID, REWARD_ID, REWARD_POINT, VOLUME, TOTAL_POINT) VALUES ('${payload.tranType}','${payload.customerID}','${params.rewardID}','${reward[0].POINT}','${payload.volume}','${payload.volume * reward[0].POINT}')`);
       await conn.query(`UPDATE REWARD SET BALANCE = BALANCE - ${payload.volume} WHERE ID = ${params.rewardID}`);
       await conn.query(`UPDATE CUSTOMER SET POINT = POINT - ${payload.volume * reward[0].POINT} WHERE ID = ${payload.customerID}`);

       // Commit Changes
       await  conn.commit();
    } catch(err){
       await    conn.rollback();
       res.status(500).json({error: err.message})
    }
    } catch(err){
        console.error("Error starting a transaction: ", err);
        res.status(500).json({error: err.message})
    }finally {
        // Close Connection
        if (conn) conn.end();
    } 
        return res.status(200).end();
}
module.exports = { getReward, addReward, updateReward, redeemReward }