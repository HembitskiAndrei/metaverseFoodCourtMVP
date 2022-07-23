import { Skeleton } from "@babylonjs/core/Bones/skeleton";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Scene } from "@babylonjs/core/scene";
import "@babylonjs/core/Collisions/collisionCoordinator";
import { AnimationGroup } from "@babylonjs/core/Animations/animationGroup";
export declare class CharacterController {
    private _avatar;
    private _skeleton;
    private _camera;
    private _scene;
    getScene(): Scene;
    private _gravity;
    private _minSlopeLimit;
    private _maxSlopeLimit;
    private _sl1;
    private _sl2;
    private _stepOffset;
    private _vMoveTot;
    private _vMovStartPos;
    private _actionMap;
    private _cameraElastic;
    private _cameraTarget;
    private _noFirstPerson;
    setSlopeLimit(minSlopeLimit: number, maxSlopeLimit: number): void;
    /**
     * The av will step up a stair only if it is closer to the ground than the indicated value.
     * Default value is 0.25 m
     */
    setStepOffset(stepOffset: number): void;
    setWalkSpeed(n: number): void;
    setRunSpeed(n: number): void;
    setBackSpeed(n: number): void;
    setBackFastSpeed(n: number): void;
    setJumpSpeed(n: number): void;
    setLeftSpeed(n: number): void;
    setLeftFastSpeed(n: number): void;
    setRightSpeed(n: number): void;
    setRightFastSpeed(n: number): void;
    setDiagonalLeftForwardSpeed(n: number): void;
    setDiagonalLeftForwardFastSpeed(n: number): void;
    setDiagonalRightForwardSpeed(n: number): void;
    setDiagonalRightForwardFastSpeed(n: number): void;
    setDiagonalRightBackSpeed(n: number): void;
    setDiagonalRightBackFastSpeed(n: number): void;
    setDiagonalLeftBackSpeed(n: number): void;
    setDiagonalLeftBackFastSpeed(n: number): void;
    setTurnSpeed(n: number): void;
    setTurnFastSpeed(n: number): void;
    setGravity(n: number): void;
    /**
     * Use this to provide animationGroups to the character controller.
     * Provide the AnimationGroups using a Map
     * In this Map the key would be the character controller animation name and
     * the key value would be the animationGroup.
     * Example:
     * let myWalkAnimationGroup:AnimationGroup = ...;
     * let agMap:{} = {
     *  "walk":myWalkAnimationGroup,
     *  "run" : {"ag":myRunAnimationGroup,"rate":1},
     *  "idle" : {"ag":myIdleAnimationGroup,"loop":true,"rate":1},
     *  ....
     *   ....
     * }
     *
     * @param agMap a map of character controller animation name to animationGroup
     */
    setAnimationGroups(agMap: {}): void;
    /**
     * Use this to provide AnimationRanges to the character controller.
     * Provide the AnimationRanges using a Map
     * In this Map the key would be the character controller animation name and
     * the key value would be the animation range name or an object with animation range data.
     * example:
     * let arMap = {
     *  "walk":"myWalk",
     *  "run" : {"name":"myRun","rate":1},
     *  "idle" : {"name":"myIdle","loop":true,"rate":1},
     *  ....
     * }
     *
     * @param arMap a map of character controller animation name to animationRange data
     */
    setAnimationRanges(arMap: {}): void;
    /**
     * updates action data in the cc actionMap
     * with action data from the provided/input actionMap
     *
     *
     * return "ar" or "ag" depending on if the data provided
     * was animation range or animation group data respt.
     *
     * TODO should validate provided data.
     * In other words if animation range provided make sure
     * the range exist in the skeleton
     * or if animation group provided make sure the animation group
     * can be played on this avataor
     *
     * @param inActMap
     * @returns
     */
    setActionMap(inActMap: ActionMap): string;
    getActionMap(): ActionMap;
    getSettings(): CCSettings;
    setSettings(ccs: CCSettings): void;
    private _setAnim;
    enableBlending(n: number): void;
    disableBlending(): void;
    setWalkAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setRunAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setWalkBackAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setWalkBackFastAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setSlideBackAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setIdleAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setTurnRightAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setTurnRightFastAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setTurnLeftAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setTurnLeftFastAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setStrafeRightAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setStrafeRightFastAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setStrafeLeftAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setStrafeLeftFastAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setDiagonalRightForwardAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setDiagonalRightForwardFastAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setDiagonalRightBackAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setDiagonalRightBackFastAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setDiagonalLeftBackAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setDiagonalLeftBackFastAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setDiagonalLeftForwardAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setDiagonalLeftForwardFastAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setIdleJumpAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setRunJumpAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setFallAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setWalkKey(key: string): void;
    setWalkBackKey(key: string): void;
    setTurnLeftKey(key: string): void;
    setTurnRightKey(key: string): void;
    setStrafeLeftKey(key: string): void;
    setStrafeRightKey(key: string): void;
    setDiagonalLeftKey(key: string): void;
    setDiagonalRightForwardKey(key: string): void;
    setDiagonalRightBackKey(key: string): void;
    setDiagonalLeftBackKey(key: string): void;
    setJumpKey(key: string): void;
    setCameraElasticity(b: boolean): void;
    setCameraTarget(v: Vector3): void;
    /**
     * user should call this whenever the user changes the camera checkCollision
     * property
     *
     */
    cameraCollisionChanged(): void;
    setNoFirstPerson(b: boolean): void;
    /**
     * if av has the required anim (walk, run etc) then
     * mark that anim as existing
     *
     * @param skel
     */
    private _checkAnimRanges;
    /**
     * if fast anims do not exist then use their slow counterpart as them but double the rate at which they play
     */
    private _checkFastAnims;
    private _copySlowAnims;
    /**
     * Use this to make the  character controller suitable for a isometeric/top down games or  fps/third person game.
     * 1 In isometric/top down games the camera direction has no bearing on avatar movement.
     * 0 In fps/third person game rotating the camera around the avatar , rotates the avatr too.
     */
    private _mode;
    private _saveMode;
    setMode(n: number): void;
    getMode(): number;
    /**
     * Use this to set  turning off.
     * When turining is off
     * a) turn left or turn right keys result in avatar facing and moving left or right with respect to camera.
     * b) walkback/runback key results in avatar facing back and walking/running towards camera.
     *
     * This setting has no effect when mode is 1.
     *
     * @param b
     */
    setTurningOff(b: boolean): void;
    isTurningOff(): boolean;
    /**
     * checks if a have left hand , right hand issue.
     * In other words if a mesh is a LHS mesh in RHS system or
     * a RHS mesh in LHS system
     * The X axis will be reversed in such cases.
     * thus Cross product of X and Y should be inverse of Z.
     * BABYLONJS GLB models are RHS and exhibit this behavior
     *
     */
    private _isRHS;
    private _signRHS;
    private _setRHS;
    private _strafeFactorWithForward;
    setStrafeFactorWithForward(n: number): void;
    private _strafeFactorWithForwardFast;
    setStrafeFactorWithForwardFast(n: number): void;
    private _strafeFactorWithBackward;
    setStrafeFactorWithBackward(n: number): void;
    private _strafeFactorWithBackwardFast;
    setStrafeFactorWithBackwardFast(n: number): void;
    /**
     * Use setFaceForward(true|false) to indicate that the avatar face  faces forward (true) or backward (false).
     * The avatar face faces forward if its face points to positive local Z axis direction
     */
    private _ffSign;
    private _ff;
    private _av2cam;
    setFaceForward(b: boolean): void;
    isFaceForward(): boolean;
    private checkAGs;
    private _containsAG;
    private _getRoot;
    private _started;
    start(): void;
    stop(): void;
    /**
     * use pauseAnim to stop the charactere controller from playing
     * any animation on the character
     * use this when you want to play your animation instead
     * see also resumeAnim()
     */
    private _stopAnim;
    pauseAnim(): void;
    /**
     * use resumeAnim to resume the character controller playing
     * animations on the character.
     * see also pauseAnim()
     */
    resumeAnim(): void;
    private _prevAnim;
    private _avStartPos;
    private _grounded;
    private _freeFallDist;
    private _fallFrameCountMin;
    private _fallFrameCount;
    private _inFreeFall;
    private _wasWalking;
    private _wasRunning;
    private _moveVector;
    private _isAvFacingCamera;
    private _moveAVandCamera;
    private _jumpStartPosY;
    private _jumpTime;
    private _doJump;
    private _calcJumpDist;
    /**
     * does cleanup at the end of a jump
     */
    private _endJump;
    /**
     * checks if two vectors v1 and v2 are equal within a precision of p
     */
    private _areVectorsEqual;
    private _verticalSlope;
    private _movFallTime;
    private _sign;
    private _isTurning;
    private _noRot;
    private _doMove;
    private _endFreeFall;
    private _idleFallTime;
    private _doIdle;
    private _groundFrameCount;
    private _groundFrameMax;
    /**
     * donot ground immediately
     * wait few more frames
     */
    private _groundIt;
    private _unGroundIt;
    private _savedCameraCollision;
    private _inFP;
    private _updateTargetValue;
    private _ray;
    private _rayDir;
    private _cameraSkin;
    private _snapCamera;
    private _move;
    anyMovement(): boolean;
    private _onKeyDown;
    private _onKeyUp;
    private _ekb;
    enableKeyBoard(b: boolean): void;
    walk(b: boolean): void;
    walkBack(b: boolean): void;
    walkBackFast(b: boolean): void;
    run(b: boolean): void;
    turnLeft(b: boolean): void;
    turnLeftFast(b: boolean): void;
    turnRight(b: boolean): void;
    turnRightFast(b: boolean): void;
    strafeLeft(b: boolean): void;
    strafeLeftFast(b: boolean): void;
    strafeRight(b: boolean): void;
    strafeRightFast(b: boolean): void;
    diagonalRightForward(b: boolean): void;
    diagonalRightForwardFast(b: boolean): void;
    diagonalLeftForward(b: boolean): void;
    diagonalLeftForwardFast(b: boolean): void;
    diagonalRightBack(b: boolean): void;
    diagonalRightBackFast(b: boolean): void;
    diagonalLeftBack(b: boolean): void;
    diagonalLeftBackFast(b: boolean): void;
    jump(): void;
    idle(): void;
    private _act;
    private _renderer;
    private _handleKeyUp;
    private _handleKeyDown;
    private _isAG;
    isAg(): boolean;
    private _findSkel;
    private _root;
    setAvatar(avatar: Mesh, faceForward?: boolean): boolean;
    getAvatar(): Mesh;
    setAvatarSkeleton(skeleton: Skeleton): void;
    getSkeleton(): Skeleton;
    private _hasAnims;
    /**
     * The avatar/character can be made up of multiple meshes arranged in a hierarchy.
     * As such we will pick the root of the hierarchy as the avatar.
     * The root should be a mesh as otherwise we cannot move it with moveWithCollision() method.
     *
     * Mutiple meshes in the hierarchy may have skeletons (if two or more meshes have skeleton then
     * the skeleton will mostly likely be the same).
     * So we will pick as avatar skeleton, the  skeleton of the first mesh in the hierachy which has
     * a skeleton
     *
     * @param avatar
     * @param camera
     * @param scene
     * @param actionMap/animationGroupMap
     *        maps actions to animations and other data like speed,sound etc
     *        or
     *        for backward compatibility could be AnimationGroup Map
     * @param faceForward
     */
    constructor(avatar: Mesh, camera: ArcRotateCamera, scene: Scene, actionMap?: {}, faceForward?: boolean);
}
export declare class ActionData {
    id: string;
    speed: number;
    ds: number;
    sound: string;
    key: string;
    dk: string;
    name: string;
    ag: AnimationGroup;
    loop: boolean;
    rate: number;
    exist: boolean;
    constructor(id?: string, speed?: number, key?: string);
    reset(): void;
}
export declare class ActionMap {
    walk: ActionData;
    walkBack: ActionData;
    walkBackFast: ActionData;
    idle: ActionData;
    idleJump: ActionData;
    run: ActionData;
    runJump: ActionData;
    fall: ActionData;
    turnLeft: ActionData;
    turnLeftFast: ActionData;
    turnRight: ActionData;
    turnRightFast: ActionData;
    strafeLeft: ActionData;
    strafeLeftFast: ActionData;
    strafeRight: ActionData;
    strafeRightFast: ActionData;
    diagonalRightForward: ActionData;
    diagonalRightForwardFast: ActionData;
    diagonalRightBack: ActionData;
    diagonalRightBackFast: ActionData;
    diagonalLeftForward: ActionData;
    diagonalLeftForwardFast: ActionData;
    diagonalLeftBack: ActionData;
    diagonalLeftBackFast: ActionData;
    slideBack: ActionData;
    reset(): void;
}
export declare class CCSettings {
    faceForward: boolean;
    gravity: number;
    minSlopeLimit: number;
    maxSlopeLimit: number;
    stepOffset: number;
    cameraElastic: boolean;
    cameraTarget: Vector3;
    noFirstPerson: boolean;
    topDown: boolean;
    turningOff: boolean;
    keyboard: boolean;
}
