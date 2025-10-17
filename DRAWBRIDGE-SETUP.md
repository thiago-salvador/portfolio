# Drawbridge Setup Guide

## What is Drawbridge?

Drawbridge is a Chrome extension that allows you to make visual comments directly in your browser (like Figma comments) and send them to Cursor for automatic implementation. It's perfect for making quick UI tweaks and visual feedback.

## 🚀 Installation Steps

### 1. Install Chrome Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top right)
3. Click **Load unpacked**
4. Navigate to and select: `/Users/thiagosalvador/Documents/Apps/TSP/jon-howell-portfolio/drawbridge/moat-chrome`
5. Pin the extension for easy access

![Extension Icon](https://github.com/user-attachments/assets/1732a588-5985-45b5-85b6-9a73c21d2b4b)

### 2. Connect to Your Project

1. Click the Drawbridge icon in Chrome
2. Click **"Connect"** button
3. Select this project folder: `/Users/thiagosalvador/Documents/Apps/TSP/jon-howell-portfolio`
4. Grant file access permissions

### 3. Start Your Dev Server

Make sure your Next.js dev server is running:

```bash
npm run dev
```

Visit: http://localhost:3001

## 💬 How to Use

### Making Comments

1. **Press `c` key** in your browser - cursor becomes crosshair
2. **Hover** over UI elements to highlight them
3. **Click** an element to add a comment
4. **Type** your feedback (e.g., "Make this text larger" or "Change color to blue")
5. **Press Enter** or click Submit
6. Comments appear in the "Moat" panel at the bottom of the page

### Processing Tasks in Cursor

1. Open Cursor in this project
2. Run the command:
   ```
   bridge
   ```
3. Cursor will read tasks from `moat-tasks.mdc` and start implementing
4. Review changes in your browser (auto-reloads with Next.js)
5. Continue making comments for refinements!

## 📁 Generated Files

Drawbridge creates these files in your project root:

- **moat-tasks.mdc** - Main task list (Markdown format)
- **moat-task-detail.json** - Detailed task metadata
- **drawbridge-workflow.mdc** - Instructions for Cursor on how to process tasks

## 🎯 Example Workflow

1. **Comment**: "Make the hero title 20% larger"
2. **Run**: `bridge` in Cursor
3. **Review**: Check browser for changes
4. **Refine**: Add another comment: "Actually, make it bold too"
5. **Repeat**: Run `bridge` again

## 🛠️ Troubleshooting

### Extension not working?
- Make sure Developer Mode is enabled in Chrome extensions
- Verify the extension is loaded from the correct folder
- Check that you've granted file access permissions

### Tasks not processing?
- Ensure dev server is running
- Try the explicit command: `use @drawbridge-workflow.mdc to process @moat-tasks.mdc`
- Check `moat-tasks.mdc` file exists and has tasks

### Changes not appearing?
- Refresh the browser page
- Check browser console for errors
- Verify Next.js dev server is running properly

## 📚 Project Context

This portfolio uses:
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS (black background, white text)
- **Design**: Minimalist, Jon Howell-inspired layout
- **Components**: React Server/Client Components

## 🎨 Design Guidelines

When making comments, keep in mind:
- Theme: Black (#000) background, White (#FFF) text
- Typography: Large bold headings, light body text
- Spacing: Generous padding (py-24 for sections)
- Responsive: Mobile-first with md/lg breakpoints
- Hover effects: Opacity transitions (hover:opacity-70)

## 📝 Tips

- Be specific in comments: "Increase font size to text-4xl" is better than "Make bigger"
- Reference existing elements: "Make this match the Portfolio text style"
- Test on mobile: Mention if changes should be responsive
- Use design tokens: "Use opacity-60" instead of "Make lighter"

---

Happy designing! 🎨✨
