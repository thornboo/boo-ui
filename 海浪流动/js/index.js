window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var angle = 0;

function animateGradient() {
    ++angle;
    box.style.cssText = 'background: linear-gradient(' + angle + 'deg, black, hsla(240,50%,30%,.2),darkcyan, navy';

    window.requestAnimationFrame(animateGradient);
}

animateGradient();

if (typeof Object.extend !== 'function') {
    Object.extend = function (d, s) {
        for (var k in s) {
            if (s.hasOwnProperty(k)) {
                var v = s[k];
                if (d.hasOwnProperty(k) && typeof d[k] === "object" && typeof v === "object") {
                    Object.extend(d[k], v);
                } else {
                    d[k] = v;
                }
            }
        }
        return d;
    };
}
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function Particle() {
    this.type = 0;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.px = 0;
    this.py = 0;
    this.radius = 0;
    this.canvas = null;
}

Particle.prototype = {
    constructor: Particle,
    init: function (properties) {
        Object.extend(this, properties);
        var ncanvas = document.createElement('canvas'),
            ncontext = ncanvas.getContext('2d');
        ncanvas.height = ncanvas.width = this.radius * 2;
        var grad = ncontext.createRadialGradient(this.radius, this.radius, 1, this.radius, this.radius, this.radius);
        grad.addColorStop(0, this.color + ',1)');
        grad.addColorStop(1, this.color + ',0)');
        ncontext.fillStyle = grad;
        ncontext.beginPath();
        ncontext.arc(this.radius, this.radius, this.radius, 0, Math.PI * 2, true);
        ncontext.closePath();
        ncontext.fill();
        this.px = this.x;
        this.py = this.y;
        this.canvas = ncanvas;
    },
    update: function () {
        var g = grid[Math.round(this.y / spacing) * num_x + Math.round(this.x / spacing)];
        if (g) g.close[g.length++] = this;

        this.vx = this.x - this.px;
        this.vy = this.y - this.py;

        if (mouse.down) {
            var dist_x = this.x - mouse.x;
            var dist_y = this.y - mouse.y;
            var dist = Math.sqrt(dist_x * dist_x + dist_y * dist_y);
            if (dist < this.radius * mouse.influence) {
                var cos = dist_x / dist;
                var sin = dist_y / dist;
                this.vx += -cos;
                this.vy += -sin;
            }
        }

        this.vx += gravity_x;
        this.vy += gravity_y;
        this.px = this.x;
        this.py = this.y;

        this.x += this.vx;
        this.y += this.vy;
    },
    attract: function () {
        var force = 0,
            force_b = 0,
            cell_x = Math.round(this.x / spacing),
            cell_y = Math.round(this.y / spacing),
            close = [];
        for (var x_off = -1; x_off < 2; x_off++) {
            for (var y_off = -1; y_off < 2; y_off++) {
                var index = (cell_y + y_off) * num_x + (cell_x + x_off);
                var cell = grid[index];
                if (!cell || !cell.length) {
                    continue;
                }
                for (var a = 0, l = cell.length; a < l; a++) {
                    var particle = cell.close[a];
                    if (particle !== this) {
                        var dfx = particle.x - this.x,
                            dfy = particle.y - this.y,
                            distance = Math.sqrt(dfx * dfx + dfy * dfy);
                        if (distance < spacing) {
                            var m = 1 - (distance / spacing);
                            force += m * m;
                            force_b += (m * m * m) / 2;
                            particle.m = m;
                            particle.dfx = (dfx / distance) * m;
                            particle.dfy = (dfy / distance) * m;
                            close.push(particle);
                        }
                    }
                }
            }
        }

        force = (force - 3) * 0.5; // test this

        for (var i = 0, l = close.length; i < l; i++) {
            var neighbor = close[i],
                press = force + force_b * neighbor.m;

            if (this.type != neighbor.type) {
                press *= 0.65;
            }

            var dx = neighbor.dfx * press * 0.5,
                dy = neighbor.dfy * press * 0.5;
            neighbor.x += dx;
            neighbor.y += dy;
            this.x -= dx;
            this.y -= dy;
        }

        if (this.x < 0) this.x = 0;
        if (this.x > width) this.x = width;
        if (this.y < 0) this.y = 0;
        if (this.y > height) this.y = height;

    },
    draw: function () {
        meta_context.drawImage(this.canvas, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }
};

function Fluid() {
    this.particles = [];
    for (var i = 0; i < num_x * num_y; i++) {
        grid.push({
            length: 0,
            close: []
        });
    }
    for (var i = 0, l = groups.length; i < l; i++) {
        for (var j = 0, k = groups[i]; j < k; j++) {
            var particle = new Particle();
            particle.init({
                type: i,
                x: Math.random() * width,
                y: Math.random() * height,
                radius: 30,
                color: colors[i]
            })
            this.particles.push(particle);
        }
    }
}

Fluid.prototype = {
    constructor: Fluid,
    update: function () {
        for (var i = 0, l = this.particles.length; i < l; i++) {
            var particle = this.particles[i];
            particle.update();
            particle.attract();
            particle.draw();
        }
    },
    render: function () {
        var image = meta_context.getImageData(0, 0, width, height),
            data = image.data;
        for (var i = 0, l = data.length; i < l; i += 4) {
            if (data[i + 3] < threshold) {
                data[i + 3] /= 6;
            }
        }
        context.putImageData(image, 0, 0);
    }
};

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    meta_canvas = document.createElement('canvas'),
    meta_context = meta_canvas.getContext('2d'),
    height = canvas.height = meta_canvas.height = 600,
    width = canvas.width = meta_canvas.width = 800,
    grid = [],
    groups = [200, 200, 200],
    gravity_x = 0,
    gravity_y = 1.35,
    spacing = 45,
    threshold = 210,
    colors = [
        'hsla(176, 93%, 66%',
        'hsla(100, 93%, 42%',
        'hsla(234, 93%, 42%',
        'hsla(189, 33%, 52%'],
    num_x = Math.round(width / spacing) + 1,
    num_y = Math.round(height / spacing) + 1,
    fluid = new Fluid(),
    mouse = (function () {
        var mouse = {
            down: false,
            x: width / 2,
            y: height / 2,
            influence: 20
        };
        var rad = mouse.influence * 10,
            xr = rad / 2,
            yr = rad / 2;
        var canvas = document.createElement('canvas'),
            context = canvas.getContext('2d'),
            grad = context.createRadialGradient(rad, rad, 1, rad, rad, rad);
        canvas.height = canvas.width = rad * .05;
        grad.addColorStop(0, 'rgba(0, 0, 0, .3)');
        grad.addColorStop(1, 'rgba(0, 0, 0, .6)');
        context.fillStyle = grad;
        context.beginPath();
        context.arc(rad, rad, rad, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
        return Object.extend(mouse, {
            canvas: canvas
        });
    }());

run();

function pull(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

function run() {
    requestAnimFrame(run);
    meta_context.clearRect(0, 0, width, height);
    for (var i = 0, l = num_x * num_y; i < l; i++) grid[i].length = 0;
    fluid.update();
    fluid.render();

    if (mouse.down) {
        context.drawImage(mouse.canvas, mouse.x - mouse.canvas.width / 2, mouse.y - mouse.canvas.height / 2);
    }

}

(function spazz() {
    mouse.down = true;
    var xP = 500,
        yP = 450,
        d = Date.now(),
        x = width / 2 + Math.sin(d / xP) * width / 2,
        y = 3 * height / 4 + Math.sin(d / yP) * height / 8;

    pull({
        clientX: x,
        clientY: y
    });
    setTimeout(spazz, .4);
}())