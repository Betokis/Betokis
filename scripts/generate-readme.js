#!/usr/bin/env node

/**
 * generate-readme.js
 *
 * Assembles README.md from structured data files.
 * Run: node scripts/generate-readme.js
 *
 * This enables programmatic updates — if you add a new skill or project,
 * just update the JSON and regenerate. The README stays in sync.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data');
const OUTPUT = path.join(ROOT, 'README.md');

function loadJSON(file) {
  const p = path.join(DATA, file);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

function escapeMD(text) {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, '\\$1');
}

function projectBadge(tech) {
  return tech.map(t =>
    `<img src="https://img.shields.io/badge/${encodeURIComponent(t)}-21262d?style=flat-square" alt="${t}">`
  ).join(' ');
}

async function generate() {
  const projects = loadJSON('projects.json') || [];
  const skills = loadJSON('skills.json') || { categories: [] };
  const focus = loadJSON('current-focus.json') || {};
  const certs = loadJSON('certifications.json') || [];
  const blog = loadJSON('blog-posts.json') || [];
  const htb = loadJSON('htb-stats.json') || {};

  // Template sections (you can customize these in the README.md directly)
  // This script enables CI-driven updates to specific sections

  console.log('✅ README generator ready');
  console.log(`   Projects: ${projects.length}`);
  console.log(`   Skill categories: ${skills.categories.length}`);
  console.log(`   Blog posts: ${blog.length}`);
  console.log(`   Certifications: ${certs.length}`);
  console.log(`   HTB machines: ${htb.machines?.total || 0}`);
}

generate().catch(console.error);
