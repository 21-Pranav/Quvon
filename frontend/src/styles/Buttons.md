# Neo Brutalist Design System

## Buttons

Import:

```css
@import "./components/buttons.css";
```

### Base

```html
<button class="btn">
    Button
</button>
```

### Variants

```html
<button class="btn btn-primary">
<button class="btn btn-secondary">
<button class="btn btn-danger">
<button class="btn btn-warning">
<button class="btn btn-info">
<button class="btn btn-experimental">
```

### Sizes

```html
<button class="btn btn-xs">
<button class="btn btn-sm">
<button class="btn btn-md">
<button class="btn btn-lg">
<button class="btn btn-xl">
```

### Utilities

```html
<button class="btn btn-full">
<button class="btn btn-pill">
<button class="btn btn-sharp">
<button class="btn btn-square">
<button class="btn btn-disabled">
```

---

# Cards

Import:

```css
@import "./components/card.css";
```

### Base

```html
<div class="card">
    Content
</div>
```

### Variants

```html
<div class="card card-primary">
<div class="card card-success">
<div class="card card-info">
<div class="card card-warning">
<div class="card card-danger">
<div class="card card-experimental">
<div class="card card-highlight">
<div class="card card-neutral">
```

### Sizes

```html
<div class="card card-xs">
<div class="card card-sm">
<div class="card card-md">
<div class="card card-lg">
<div class="card card-xl">
```

### Effects

```html
<div class="card card-hover">
<div class="card card-press">
<div class="card card-glow">
<div class="card card-flat">
<div class="card card-floating">
```

### Shapes

```html
<div class="card card-rounded">
<div class="card card-pill">
<div class="card card-sharp">
```

### Layout Helpers

```html
<div class="card card-row">
<div class="card card-center">
<div class="card card-space-between">
<div class="card card-full">
```

### Sections

```html
<div class="card">

    <div class="card-header">
        <div class="card-subtitle">
            SYSTEM
        </div>

        <div class="card-title">
            Card Title
        </div>
    </div>

    <div class="card-body">
        Content
    </div>

    <div class="card-footer">
        Footer
    </div>

</div>
```

---

# Inputs

Import:

```css
@import "./components/input.css";
```

### Base

```html
<input class="input" />
```

### Variants

```html
<input class="input input-primary" />
<input class="input input-info" />
<input class="input input-success" />
<input class="input input-warning" />
<input class="input input-danger" />
<input class="input input-experimental" />
<input class="input input-highlight" />
```

### Sizes

```html
<input class="input input-xs" />
<input class="input input-sm" />
<input class="input input-md" />
<input class="input input-lg" />
<input class="input input-xl" />
```

### Shapes

```html
<input class="input input-rounded" />
<input class="input input-pill" />
<input class="input input-sharp" />
```

### States

```html
<input class="input input-disabled" />
<input class="input input-error" />
<input class="input input-success-state" />
```

### Textarea

```html
<textarea class="input textarea"></textarea>
```

### Input Group

```html
<div class="input-group">

    <label class="input-label">
        Username
    </label>

    <input
        class="input input-primary"
        placeholder="Enter username"
    />

    <div class="input-helper">
        This will be public
    </div>

</div>
```

### Icon Input

```html
<div class="input-icon-wrap">

    <span class="input-icon">
        @
    </span>

    <input
        class="input input-with-icon"
        placeholder="Username"
    />

</div>
```

---

# Recommended Pattern

Use composable classes:

```html
<button class="btn btn-primary btn-lg">
```

```html
<div class="card card-info card-hover card-lg">
```

```html
<input class="input input-warning input-rounded">
```

Avoid creating page-specific styles unless layout is unique.
