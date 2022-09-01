import Reserve from "../models/Reserve";

class ReserveController{
  
  async store(req, res){
    const { user_id } = req.headers;
    const { house_id } = req.params;
    const { date } = req.body;

    const reserve = await Reserve.create({
      user: user_id,
      houser: house_id,
      date,
    });

    return res.json(reserve);
  }
}

export default new ReserveController();