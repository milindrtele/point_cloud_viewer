import { useEffect, useRef } from "react";
import * as THREE from "three";
import { MapControls } from "three/addons/controls/MapControls.js";

function PotreeViewer() {
  const containerRef = useRef(null);

  useEffect(() => {
    const loadPotree = async () => {
      //await import("/build/potree/potree.js");
      const viewer = new Potree.Viewer(containerRef.current);

      console.log(viewer);

      viewer.setEDLEnabled(true);
      viewer.setFOV(60);
      viewer.setPointBudget(1_000_000_000);
      viewer.loadSettingsFromURL();
      //viewer.setDescription("Loading Entwine-generated EPT format");

      viewer.loadGUI(() => {
        viewer.setLanguage("en");
        document.querySelector("#menu_appearance")?.nextElementSibling?.show();
      });

      const path = "/point_clouds/canteen_h1/ept.json";
      Potree.loadPointCloud(path, "lion", (e) => {
        viewer.scene.addPointCloud(e.pointcloud);
        e.pointcloud.material.size = 0.5;
        e.pointcloud.material.pointSizeType = Potree.PointSizeType.ADAPTIVE;
        viewer.fitToScreen(0.5);
      });

      viewer.controls.enabled = false;
      viewer.orbitControls.enabled = false;
      viewer.fpControls.enabled = true;

      //camera and controls
      // const camera = new THREE.PerspectiveCamera(
      //   45,
      //   window.innerWidth / window.innerHeight,
      //   1,
      //   10000
      // );
      // camera.position.set(0, 20, 100);
      // const controls = new MapControls(camera, viewer.renderer.domElement);
      // controls.enableDamping = true;

      //sphere geometry
      const geometry = new THREE.SphereGeometry(0.5, 32, 16);
      const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
      const sphere = new THREE.Mesh(geometry, material);
      viewer.scene.scene.add(sphere);
    };

    loadPotree();
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          left: 0,
          top: 0,
          backgroundImage:
            "url('/build/potree/resources/images/background.jpg')",
        }}
      />
    </>
  );
}

export default PotreeViewer;
