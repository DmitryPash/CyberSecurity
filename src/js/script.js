//Variables
let D = document;

//Variables for setup - animate planet

let container;
let camera;
let renderer;
let scene;
let house;

function init() {
  container = document.querySelector(".scene");

  //Create scene
  scene = new THREE.Scene();

  const fov = 55;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(1, 1, 100);

  const ambient = new THREE.AmbientLight(0xd3d3d3, 1);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xd3d3d3, 2);
  light.position.set(25, 25, 25);
  scene.add(light);
  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load Model
  let loader = new THREE.GLTFLoader();
  loader.load("./images/model/planet/scene.gltf", function(gltf) {
    scene.add(gltf.scene);
    house = gltf.scene.children[0];
    house.scale.set(1,1,1)
    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);
  house.rotation.z += 0.001;
  renderer.render(scene, camera);
}

init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);


// GSAP - animate scroll
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
if(ScrollTrigger.isTouch !== 1) {
  ScrollSmoother.create({
    wrapper: '.wrapper',
    content: '.content',
    smooth: 1.5,
    effects: true,
  });

  gsap.fromTo('.main-header', { opacity:1 }, { 
    opacity:0,
    scrollTrigger: {
      trigger: '.main-header',
      start: '0',
      end: '700',
      scrub: true,
    }
  })

  gsap.fromTo('.header',{borderBottom: 'none', background: 'transparent'},{
    borderBottom: '1px solid #D88730',
    background: 'linear-gradient(to right, #24243e, #232047, #1B2137)',
    scrollTrigger: {
      trigger: '.header',
      start: '200',
      end: '200',
      scrub: true,
    }
  })

}


// Animate counter
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)

  );
}


const box = document.querySelector('.promo-advantages');

document.addEventListener('scroll', function () {
  const messageText = isInViewport(box) 
  if(messageText) {
    countersAnim()
  }
}, {
  passive: true
});



function countersAnim() {
	$('.promo-advantage').not('.animated').each(function(key,item){      
			let counter = $(item).find('.animated-counter');
			jQuery({ Counter: 0 }).animate({ Counter: counter.text() }, {
				duration: 2000,
				easing: 'swing',
				step: function () {
					counter.text(Math.ceil(this.Counter));
				}
			});
			$(item).addClass('animated');
	})
	
}

//* Initialize popup
$(document).on("click", ".mfp-link", function () {
  var a = $(this);
  $.magnificPopup.open({
    items: { src: a.attr("data-href") },
    type: "ajax",
    overflowY: "scroll",
    removalDelay: 610,
    mainClass: "my-mfp-zoom-in",
    ajax: {
      tError: "Error. Not valid url",
    },
    callbacks: {
      open: function () {
        setTimeout(function () {
          $(".mfp-wrap, .mfp-bg").addClass("delay-back");
          $(".mfp-popup").addClass("delay-back");
        }, 700);
      },
    },
  });
  return false;
});

