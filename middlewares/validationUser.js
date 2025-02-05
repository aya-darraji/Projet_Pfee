const yup = require("yup");

const ValidationUserSchema = yup.object({
  username: yup
    .string()
    .required("Le nom est obligatoire")
    .min(3, "Le nom doit comporter au moins 3 caracteres")
    .max(30, "Le nom doit comporter au max 30 car"),
  age: yup
    .number()
    .integer("l'age doit etre un nombre entier")
    .min(18, "dot avoir au moins 18 ans")
    .max(100, "ne peut pas depasser 100 ans"),
  image_user: yup.string().notRequired(),
  email: yup
    .string()
    .required("email obligatoire")
    .email("email n'est pas valide"),
  password: yup
    .string()
    .required("password est obligatoire")
    .min(8)
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])/,
      "le mdp doit etre Exemple: Sazr123"
    ),
  role: yup.string().oneOf(["admin", "client"]),
  cars: yup
    .array()
    .of(yup.string().matches(/^[0-9a-fA-F]{24}$/, "invalide"))
    .notRequired(),
});

function ValidationUser(req, res, next) {
  ValidationUserSchema.validate(req.body)
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(400).json({
        message: "Validation des données échouée",
        errors: err.errors,
      });
    });
}

module.exports = ValidationUser;
