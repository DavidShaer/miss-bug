import express from 'express'
import { getBugs, getBug, deleteBug, updateBug, addBug } from './bug.controller.js'

const router = express.Router()
router.get('/', getBugs)
router.get('/:bugId', getBug)
router.put('/:bugId', updateBug)
router.post('/', addBug)
router.delete('/:id', deleteBug)

export const BugRoutes = router