const Joi = require('joi');

const validateMiddleware = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    next();
};

const schemas = {
    registerSchema: Joi.object({
        username: Joi.string().required().messages({
            'any.required': 'Le nom d\'utilisateur est requis.',
            'string.empty': 'Le champ nom d\'utilisateur ne peut pas être vide.',
        }),
        email: Joi.string().email().required().messages({
            'string.email': 'Le format de l\'adresse e-mail est invalide.',
            'any.required': 'L\'adresse e-mail est obligatoire.',
        }),
        password: Joi.string().min(8).required().messages({
            'string.min': 'Le mot de passe doit contenir au moins 8 caractères.',
            'any.required': 'Le mot de passe est requis.',
        }),
    }),

    loginSchema: Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Le format de l\'adresse e-mail est invalide.',
            'any.required': 'L\'adresse e-mail est obligatoire.',
        }),
        password: Joi.string().required().messages({
            'any.required': 'Le mot de passe est requis.',
        }),
    }),

    updateProfileSchema: Joi.object({
        profile: Joi.object({
            firstName: Joi.string().optional(),
            lastName: Joi.string().optional(),
            avatarUrl: Joi.string().uri().optional().messages({
                'string.uri': 'L\'URL de l\'avatar doit être valide.',
            }),
            bio: Joi.string().max(500).optional().messages({
                'string.max': 'La biographie ne doit pas dépasser 500 caractères.',
            }),
            dateOfBirth: Joi.date().optional().messages({
                'date.base': 'La date de naissance doit être valide.',
            }),
        }).required(),
    }),

    updateSettingsSchema: Joi.object({
        settings: Joi.object({
            language: Joi.string().valid('fr', 'en', 'es').optional().messages({
                'any.only': 'La langue doit être "fr", "en" ou "es".',
            }),
            theme: Joi.string().valid('light', 'dark').optional().messages({
                'any.only': 'Le thème doit être "light" ou "dark".',
            }),
            notifications: Joi.object({
                email: Joi.boolean().required(),
                sms: Joi.boolean().required(),
                push: Joi.boolean().required(),
            }).required(),
        }).required(),
    }),

    verifyEmailSchema: Joi.object({
        token: Joi.string().required().messages({
            'any.required': 'Le token de vérification est requis.',
        }),
    }),    

    resetPasswordRequestSchema: Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Le format de l\'adresse e-mail est invalide.',
            'any.required': 'L\'adresse e-mail est obligatoire.',
        }),
    }),

    resetPasswordConfirmSchema: Joi.object({
        token: Joi.string().required().messages({
            'any.required': 'Le token de réinitialisation est requis.',
        }),
        newPassword: Joi.string().min(8).required().messages({
            'string.min': 'Le nouveau mot de passe doit contenir au moins 8 caractères.',
            'any.required': 'Le nouveau mot de passe est requis.',
        }),
    }),

    changePasswordSchema: Joi.object({
        currentPassword: Joi.string().min(8).required().messages({
            'string.min': 'Le mot de passe actuel doit contenir au moins 8 caractères.',
            'any.required': 'Le mot de passe actuel est requis.',
        }),
        newPassword: Joi.string().min(8).required().messages({
            'string.min': 'Le nouveau mot de passe doit contenir au moins 8 caractères.',
            'any.required': 'Le nouveau mot de passe est requis.',
        }),
    }),

    addCardSchema: Joi.object({
        card: Joi.object({
            name: Joi.string().required().messages({
                'any.required': 'Le nom de la carte est requis.',
                'string.empty': 'Le champ nom de la carte ne peut pas être vide.'
            }),
            type: Joi.alternatives().try(
                Joi.string(),
                Joi.array().items(Joi.string())
            ).required().messages({
                'any.required': 'Le type de la carte est requis.',
                'string.empty': 'Le champ type de la carte ne peut pas être vide.',
                'array.base': 'Le champ type de la carte doit être une chaîne ou un tableau de chaînes.'
            }),
            rarity: Joi.string().required().messages({
                'any.required': 'La rareté de la carte est requise.',
                'string.empty': 'Le champ rareté de la carte ne peut pas être vide.'
            }),
            features: Joi.alternatives().try(
                Joi.string(),
                Joi.array().items(Joi.string())
            ).optional().messages({
                'string.empty': 'Le champ caractéristiques de la carte peut être vide.',
                'array.base': 'Le champ caractéristiques doit être une chaîne ou un tableau de chaînes.'
            }),
            numPok: Joi.number().integer().optional().messages({
                'number.base': 'Le champ numPok doit être un nombre entier.'
            }),
            image: Joi.string().uri().optional().messages({
                'string.uri': 'L\'URL de l\'image doit être valide.'
            }),
            extension: Joi.string().required().messages({
                'any.required': 'L\'extension de la carte est requise.',
                'string.empty': 'Le champ extension de la carte ne peut pas être vide.'
            }),
            bloc: Joi.string().required().messages({
                'any.required': 'Le bloc de la carte est requis.',
                'string.empty': 'Le champ bloc de la carte ne peut pas être vide.'
            })
        }).required()
    }),

    updateCardQuantitySchema: Joi.object({
        quantity: Joi.number().integer().min(1).required().messages({
            'number.base': 'La quantité doit être un nombre entier.',
            'number.min': 'La quantité ne peut pas être inférieure à 1.',
            'any.required': 'La quantité est requise.'
        })
    }),

    liveSearchSchema: Joi.object({
        term: Joi.string().required().messages({
            'any.required': 'Le terme de recherche est requis.',
            'string.empty': 'Le terme de recherche ne peut pas être vide.',
        }),
    }),

    completeSearchSchema: Joi.object({
        term: Joi.string().required().messages({
            'any.required': 'Le terme de recherche est requis.',
            'string.empty': 'Le terme de recherche ne peut pas être vide.',
        }),
    }),
};

module.exports = { validateMiddleware, schemas };